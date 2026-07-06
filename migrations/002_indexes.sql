-- notes are listed newest-first; updated_at is plaintext (_at suffix) so the index is usable
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON app_notes__notes(updated_at DESC);
