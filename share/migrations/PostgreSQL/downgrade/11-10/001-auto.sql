-- Convert schema '/root/GADS/share/migrations/_source/deploy/11/001-auto.yml' to '/root/GADS/share/migrations/_source/deploy/10/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE layout DROP COLUMN force_regex;

;

COMMIT;

