// Pure, testable logic extracted from index.html.
// No DOM, no network — safe to import from Node for unit tests.

export function memberName(membersMap, id) {
  return membersMap.get(id)?.name ?? id;
}

// Map a raw DB row (snake_case) to the note shape the UI uses (camelCase).
export function mapNoteRow(r) {
  return {
    id: r.id,
    title: r.title,
    content: r.content,
    createdBy: r.created_by,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export function mapNoteRows(rows) {
  return (rows ?? []).map(mapNoteRow);
}
