#!/usr/bin/perl

=pod
GADS - Globally Accessible Data Store
Copyright (C) 2014 Ctrl O Ltd

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
use lib "$Bin/../lib";

use Text::CSV;
use Log::Report;
use Getopt::Long;

use Dancer2;
use Dancer2::Plugin::DBIC;

my ($layout_id, $parent_top);

GetOptions(
    'layout-id=i' => \$layout_id,
    'parent-id=i' => \$parent_top,
) or error __"Usage: $0 --layout-id <layout_id> [--parent-id <parent_id>] (use STDIN for the CSV data)";

$layout_id or error __"Usage: $0 --layout-id <layout_id> [--parent-id <parent_id>] (use STDIN for the CSV data)";

my $l = rset('Layout')->find($layout_id)
    or die "Layout ID $layout_id not found in database";

info __x("Using field {name}", name => $l->name);

my $csv = Text::CSV->new
    or error __x("Cannot use CSV: {error}", error => Text::CSV->error_diag());

my @parents;
while (<STDIN>)
{
    $csv->parse($_)
        or error __x("Failed to parse link {link}", link => $_);
    my @row = $csv->fields;

    my $count;
    foreach my $col (@row)
    {
        $count++;
        next unless $col;
        my $parent = $parents[$count-1] || $parent_top;
        $parent = rset('Enumval')->create({
            value     => $col,
            layout_id => $layout_id,
            parent    => $parent,
        })->id;
        $parents[$count] = $parent;
    }
}

info __x("Finished importing tree for layout {layout_id}", layout_id => $layout_id);
