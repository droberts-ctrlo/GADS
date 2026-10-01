#!/usr/bin/perl

use FindBin;
use lib "$FindBin::Bin/../lib";

use Getopt::Long;
use Text::CSV;
use Log::Report 'linkspace';

use Dancer2;
use Dancer2::Plugin::DBIC;

my ( $import, $export, $file );

GetOptions(
    'import' => \$import,
    'export' => \$export,
    'file=s' => \$file
) or exit;

( $import || $export ) or error __"Please state if you want to import/export group permissions with --import or --export";

if ($import) {
    import_permissions();
}
else {
    # We know it'll be one or the other due to the error above
    export_permissions();
}

sub import_permissions {

    -f $file or error __x "File '{file}' does not exist", file => $file;

    my $csv = csv( in => $file, headers => "auto" )
        or fault __x "Unable to open file {file}", file => $file;

    my $guard = schema->txn_scope_guard;

    while ( my $row = $csv->getline_hr ) {
        my $RowCount   = $csv->record_number;
        my $layout_id  = $row->{layout_id};
        my $group_id   = $row->{group_id};
        my $permission = $row->{permission};

        error __x "Invalid Layout ID '{layout_id}' on row {row}",
            layout_id => $layout_id,
            row       => $RowCount
                unless defined $layout_id && $layout_id =~ /^\d+$/;
        error __x "Invalid Group ID '{group_id}' on row {row}",
            group_id => $row->{group_id},
            row      => $RowCount
                unless defined $group_id && $group_id =~ /^\d+$/;
        error __x"Invalid Permission '{permission}' on row {row}. Value must be read, write_new, write_existing, or write_existing_no_approval.",
            permission => $permission,
            row        => $RowCount
                unless defined $permission && $permission =~ /^(?:read|write_new|write_existing|write_existing_no_approval|write_new_no_approval)$/;

        rset('Layout')->find($layout_id)
            or error __x "Layout ID '{layout_id}' does not exist", layout_id => $layout_id;
        rset('Group')->find($group_id)
            or error __x "Group ID '{group_id}' does not exist", group_id => $group_id;

        rset('LayoutGroup')->find(
            {
                layout_id  => $layout_id,
                group_id   => $group_id,
                permission => $permission
            }
        ) // rset('LayoutGroup')->create(
            {
                layout_id  => $layout_id,
                group_id   => $group_id,
                permission => $permission,
            }
        );
        info __x"Permission '{permission}' with group '{group_id}' for layout '{layout_id}' processed",
            permission => $permission,
            group_id   => $group_id,
            layout_id  => $layout_id;
    }
    $guard->commit;
    info "Import complete";
}

sub export_permissions {
    !-f $file or error __x "File '{file}' already exists!", file => $file;

    print "Enter the group IDs you're looking to export (e.g. 1,2,3): ";
    my $input = <STDIN>;
    chomp($input);

    error __"You need to enter a number or a comma-separated list of numbers.\n"
        unless $input && $input =~ /^\s*\d+(?:\s*,\s*\d+)*\s*$/;

    my @groups = split( /\s*,\s*/, $input );

    my $csv = Text::CSV->new( { binary => 1, auto_diag => 1 } );
    open my $fh, ">:encoding(utf8)", $file
        or fault __x "Unable to write to file '{file}'", file => $file;

    my @layout_groups = rset('LayoutGroup')->search(
        {
            'me.group_id' => { '-in' => \@groups },
        },
        {
            prefetch     => ['layout'],
            result_class => 'DBIx::Class::ResultClass::HashRefInflator'
        }
    )->all;

    return unless @layout_groups;  # More of a sanity check, should never happen

    $csv->say( $fh, [ sort( keys( %{ $layout_groups[0] } ) ) ] );

    foreach my $lg (@layout_groups) {
        $csv->say( $fh, [ map { $lg->{$_} } sort( keys( %{$lg} ) ) ] );
    }
    close($fh);

    info __x "Successfully exported permissions to '{file}'", file => $file;
}
