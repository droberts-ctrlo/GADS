-- Convert schema '/home/droberts/source/gads2/bin/../share/migrations/_source/deploy/111/001-auto.yml' to '/home/droberts/source/gads2/bin/../share/migrations/_source/deploy/110/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE "user" DROP COLUMN signing_key;

;
ALTER TABLE "user" DROP COLUMN key_datetime;

;

COMMIT;

