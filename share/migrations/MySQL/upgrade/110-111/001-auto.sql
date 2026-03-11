-- Convert schema '/home/droberts/source/gads2/bin/../share/migrations/_source/deploy/110/001-auto.yml' to '/home/droberts/source/gads2/bin/../share/migrations/_source/deploy/111/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE user ADD COLUMN signing_key varchar(131) NULL;

;

COMMIT;

