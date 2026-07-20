import { describe, it, expect } from "vitest";
import { memberName, mapNoteRow, mapNoteRows, searchableFields } from "../src/logic.js";

describe("memberName", () => {
  const map = new Map([["m1", { name: "Alex" }]]);
  it("resolves a known member", () => expect(memberName(map, "m1")).toBe("Alex"));
  it("falls back to the raw id", () => expect(memberName(map, "m9")).toBe("m9"));
});

describe("mapNoteRow", () => {
  it("maps snake_case columns to camelCase note fields", () => {
    const row = { id: "1", title: "T", content: "C", created_by: "m1", created_at: "a", updated_at: "b" };
    expect(mapNoteRow(row)).toEqual({
      id: "1", title: "T", content: "C", createdBy: "m1", createdAt: "a", updatedAt: "b",
    });
  });
});

describe("mapNoteRows", () => {
  it("maps a list of rows", () => {
    const rows = [{ id: "1", created_by: "m1" }, { id: "2", created_by: "m2" }];
    expect(mapNoteRows(rows).map(n => n.createdBy)).toEqual(["m1", "m2"]);
  });
  it("tolerates null/undefined", () => {
    expect(mapNoteRows(null)).toEqual([]);
    expect(mapNoteRows(undefined)).toEqual([]);
  });
});

describe("searchableFields", () => {
  it("includes both title and content so body text is findable", () => {
    const note = { title: "Wifi", content: "password is hunter2" };
    expect(searchableFields(note)).toEqual(["Wifi", "password is hunter2"]);
  });
});
