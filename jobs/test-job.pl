#!/usr/bin/perl

use strict;
use warnings;

use Log::Report 'testjob';

use FindBin qw/$Bin/;

use lib "$Bin/../lib";
use lib "$Bin/../../GADS/lib";

#export the run command so that the cronjobs script can call it
require Exporter;
our @ISA = qw(Exporter);
our @EXPORT = qw(run);

dispatcher 'FILE', 'log', mode => 'DEBUG', to => "$Bin/../testjob.log", accept => 'ALL';

my $task = sub {
    # Task code
    info "Running local job task...";
};

sub run($) {
    my $runner = shift;
    error __"No DaemonRunner instance provided" unless defined $runner;
    $runner->run_task($task);
}
