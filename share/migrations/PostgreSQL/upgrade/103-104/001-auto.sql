-- Convert schema '/home/droberts/source/gads/share/migrations/_source/deploy/103/001-auto.yml' to '/home/droberts/source/gads/share/migrations/_source/deploy/104/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE instance ADD COLUMN security_marking text;

;
ALTER TABLE report ADD COLUMN title text;

;
ALTER TABLE report ADD COLUMN security_marking text;

;
ALTER TABLE site ADD COLUMN security_marking text;

;
ALTER TABLE site ADD COLUMN site_logo bytea;

;

COMMIT;

