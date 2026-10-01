#!/usr/bin/perl

=pod
GADS - Globally Accessible Data Store
Copyright (C) 2017 Ctrl O Ltd

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
=cut

use strict;
use warnings;

use FindBin qw/$Bin/;
use lib "$FindBin::Bin/../lib";

use Text::CSV;
use Getopt::Long;
use Log::Report;

use Dancer2;
use Dancer2::Plugin::DBIC;

my ($site_id, $file);

GetOptions(
    'site-id=i' => \$site_id,
    'file=s'    => \$file,
) or error __"Usage: $0 --site-id <site_id> --file <filename>";

schema->site_id($site_id);

$file or error __"Usage: $0 --site-id <site_id> --file <filename>";

my $csv = Text::CSV->new
    or error __x"Cannot use CSV: {error}", error => Text::CSV->error_diag();

open my $fh, "<:encoding(utf8)", $file
    or fault __x"Cannot open file {file}", file => $file;

# Index all names
my %titles        = map { $_->name => $_->id } rset('Title')->all;
my %organisations = map { $_->name => $_->id } rset('Organisation')->all;
my %groups        = map { $_->name => $_->id } rset('Group')->all;

my $guard = schema->txn_scope_guard;

while (my $row = $csv->getline($fh))
{
    my ($firstname, $surname, $email, $freetext1, $freetext2, $title, $organisation, $group) = @$row;

    my $title_id        = $titles{$title}
        or error __x"Title \"{title}\" not found", title => $title;
    my $organisation_id = $organisations{$organisation}
        or error __x"Organisation \"{organisation}\" not found", organisation => $organisation;
    my $group_id        = $groups{$group}
        or error __x"Group \"{group}\" not found", group => $group;
    my $user = rset('User')->create({
        firstname    => $firstname,
        surname      => $surname,
        email        => $email,
        username     => $email,
        freetext1    => $freetext1,
        freetext2    => $freetext2,
        title        => $title_id,
        organisation => $organisation_id,
    });
    rset('UserGroup')->create({
        user_id  => $user->id,
        group_id => $group_id,
    });
}

$guard->commit;

info __"Finished";
