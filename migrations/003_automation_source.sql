-- Automation support for the `add_note` action.
--
-- `source_event_id` records which app event produced the row. The dispatcher's
-- dedupe guard matches on it (SELECT 1 FROM ... WHERE source_event_id = ?
-- LIMIT 1), so a retried or replayed delivery finds the existing row and skips
-- instead of writing the same note twice.
--
-- Nullable on purpose: notes written by a person have no source event, and the
-- guard only ever looks for a specific non-null id.
ALTER TABLE app_notes__notes ADD COLUMN source_event_id TEXT;

CREATE INDEX IF NOT EXISTS app_notes__idx_notes_source_event_id
  ON app_notes__notes(source_event_id);
