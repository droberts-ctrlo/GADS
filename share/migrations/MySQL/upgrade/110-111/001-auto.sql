-- Convert schema '/workspaces/GADS/bin/../share/migrations/_source/deploy/110/001-auto.yml' to '/workspaces/GADS/bin/../share/migrations/_source/deploy/111/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE user ADD COLUMN reset_requested datetime NULL;

;

COMMIT;

