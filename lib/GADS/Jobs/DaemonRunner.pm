package GADS::Jobs::DaemonRunner;

use strict;
use warnings;

use Moo;

use Log::Report 'linkspace';

use Any::Daemon;

has workdir => (
    is      => 'ro',
    required => 1,
);

has daemon => (
    is      => 'lazy',
    builder => sub {
        Any::Daemon->new(
            options => {
                user  => 'lspace',
                group => 'lspace',
                workdir => shift->workdir
            }
        );
    },
);

has run_options => (
    is      => 'lazy',
    builder => sub {
        {
            child_died => sub {
                my ( $pid, $exit_code ) = @_;
                fault __x"Child {pid} exited with code {code}", pid => $pid, code => $exit_code unless $exit_code == 0;
                info __x"Child {pid} exited with code {code}", pid => $pid, code => $exit_code;
            },
            background => !$ENV{SCRIPT_DEBUG},
        }
    },
);

sub run_task {
    my ( $self, $task, @params ) = @_;
    my %run_definition = (
        %{$self->run_options},
        child_task => sub {
            info "Running task...";
            $task->(@params);
            exit 0;
        },
    );
    return $self->daemon->run(%run_definition);
}

1;
