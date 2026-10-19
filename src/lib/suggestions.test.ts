import { beforeEach, describe, expect, mock, test } from "bun:test";

const insert = mock(async (_input: unknown) => ({ error: null }));
const order = mock(async (_column: string, _options: unknown) => ({ data: [], error: null }));
const select = mock((_columns: string) => ({ order }));
const eq = mock(async (_column: string, _id: unknown) => ({ error: null }));
const update = mock((_input: unknown) => ({ eq }));
const remove = mock(() => ({ eq }));
mock.module("@/lib/supabase", () => ({
  supabase: { from: (_table: string) => ({ insert, select, update, delete: remove }) },
}));

const { createSuggestion, listSuggestions, setSuggestionStatus, deleteSuggestion, suggestionInputSchema } = await import("./suggestions");

beforeEach(() => { insert.mockClear(); select.mockClear(); order.mockClear(); update.mockClear(); eq.mockClear(); remove.mockClear(); });

describe("suggestion rules", () => {
  test("message is required, including whitespace-only input", () => {
    expect(suggestionInputSchema.safeParse({ message: "", author_name: "" }).success).toBe(false);
    expect(suggestionInputSchema.safeParse({ message: " \n ", author_name: "" }).success).toBe(false);
  });
  test("message accepts 5000 characters but rejects 5001", () => {
    expect(suggestionInputSchema.safeParse({ message: "a".repeat(5000), author_name: "" }).success).toBe(true);
    expect(suggestionInputSchema.safeParse({ message: "a".repeat(5001), author_name: "" }).success).toBe(false);
  });
  test("optional name accepts 120 characters but rejects 121", () => {
    expect(suggestionInputSchema.safeParse({ message: "Idea", author_name: "a".repeat(120) }).success).toBe(true);
    expect(suggestionInputSchema.safeParse({ message: "Idea", author_name: "a".repeat(121) }).success).toBe(false);
  });
  test("blank name becomes null and no identifying fields are submitted", async () => {
    await createSuggestion("Idea\nSegunda línea", "  ");
    expect(insert.mock.calls[0]?.[0]).toEqual({ message: "Idea\nSegunda línea", author_name: null });
  });
  test("employee INSERT does not select or request returned rows", async () => {
    await createSuggestion("Idea", "Ana");
    expect(insert).toHaveBeenCalledTimes(1);
    expect(select).not.toHaveBeenCalled();
  });
  test("admin list orders by most recent creation first", async () => {
    await listSuggestions();
    expect(order.mock.calls[0]).toEqual(["created_at", { ascending: false }]);
  });
  test("admin can mark reviewed and return to new", async () => {
    await setSuggestionStatus(10, "revisada");
    await setSuggestionStatus(10, "nueva");
    expect(update.mock.calls.map((call) => call[0])).toEqual([{ status: "revisada" }, { status: "nueva" }]);
    expect(eq.mock.calls).toEqual([["id", 10], ["id", 10]]);
  });
  test("admin deletion targets only the selected suggestion", async () => {
    await deleteSuggestion(10);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(eq.mock.calls[0]).toEqual(["id", 10]);
  });
});