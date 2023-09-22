import { SearchResult } from "./search-result";

describe("SearchResult Unit Tests", () => {
  test("constructor props", () => {
    let result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });
    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      sort: "name",
      sortDir: "asc",
      filter: "test",
    });

    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
      sort: "name",
      sortDir: "asc",
      filter: "test",
    });
  });
  test("should set lastPage = 1 when perPage field is greater than total field", () => {
    const result = new SearchResult({
      items: [] as any,
      total: 4,
      currentPage: 1,
      perPage: 15,
      sort: "name",
      sortDir: "asc",
      filter: "test",
    });

    expect(result.lastPage).toBe(1);
  });

  test("lastPage prop when total is not a multiple of perPage", () => {
    const result = new SearchResult({
      items: [] as any,
      total: 101,
      currentPage: 1,
      perPage: 20,
      sort: "name",
      sortDir: "asc",
      filter: "test",
    });

    expect(result.lastPage).toBe(6);
  });
});
