import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { describe, it, expect } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(__dirname, "../manifest.json"), "utf-8"));
const page = readFileSync(join(__dirname, "../src/index.html"), "utf-8");

const item = manifest.shareable?.note;

/**
 * A share link is an anonymous read that skips row policies, so the declared
 * columns are the whole public surface. These pin that surface to what the
 * panel tells the adult minting the link.
 */
describe("shareable.note", () => {
  it("anchors on the notes table by id", () => {
    expect(item.table).toBe("notes");
    expect(item.id_column ?? "id").toBe("id");
    expect(item.title_column).toBe("title");
  });

  // The panel says: title, text, last updated. Nothing about who wrote it —
  // created_by is a member id, and a member id means nothing outside the
  // household except as a way to correlate links.
  it("projects exactly the note's text and last-updated date", () => {
    expect(item.columns.map((c) => c.column)).toEqual(["content", "updated_at"]);
    expect(JSON.stringify(item)).not.toContain("created_by");
    expect(JSON.stringify(item)).not.toContain("source_event_id");
  });

  it("is read-only: no submit form, feed or files", () => {
    expect(item.submit).toBeUndefined();
    expect(item.feed).toBeUndefined();
    expect(item.files).toBeUndefined();
  });

  it("is the item type the page mints", () => {
    expect(Object.keys(manifest.shareable)).toEqual(["note"]);
    expect(page).toMatch(/itemType:\s*"note"/);
  });
});
