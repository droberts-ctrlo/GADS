-- Convert schema '/home/abeverley/git/GADS/share/migrations/_source/deploy/44/001-auto.yml' to '/home/abeverley/git/GADS/share/migrations/_source/deploy/43/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE graph DROP CONSTRAINT graph_fk_x_axis_link;

;
DROP INDEX graph_idx_x_axis_link;

;
ALTER TABLE graph DROP COLUMN x_axis_link;

;

COMMIT;

