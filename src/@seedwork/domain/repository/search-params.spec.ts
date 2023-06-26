import { SearchParams } from "./search-params";

describe("SearchParams Unit Tests", () => {
  test("page prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.page).toBe(1);
    const arrange = [
      { page: null as any, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];
    arrange.forEach((item) => {
      expect(new SearchParams({ page: item.page }).page).toBe(item.expected);
    });
  });
  test("per page prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.perPage).toBe(15);
    const arrange = [
      { perPage: null as any, expected: 15 },
      { perPage: undefined, expected: 15 },
      { perPage: "", expected: 15 },
      { perPage: "fake", expected: 15 },
      { perPage: 0, expected: 15 },
      { perPage: -1, expected: 15 },
      { perPage: 5.5, expected: 15 },
      { perPage: true, expected: 15 },
      { perPage: false, expected: 15 },
      { perPage: {}, expected: 15 },
      { perPage: 1, expected: 1 },
      { perPage: 2, expected: 2 },
    ];
    arrange.forEach((item) => {
      expect(new SearchParams({ perPage: item.perPage }).perPage).toBe(
        item.expected
      );
    });
  });
  test("sort prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.sort).toBeNull();
    const arrange = [
      { sort: null as any, expected: null as any },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: "field", expected: "field" },
      { sort: 0, expected: "0" },
      { sort: -1, expected: "-1" },
      { sort: 5.5, expected: "5.5" },
      { sort: true, expected: "true" },
      { sort: false, expected: "false" },
      { sort: {}, expected: "[object Object]" },
    ];
    arrange.forEach((item) => {
      expect(new SearchParams({ sort: item.sort }).sort).toBe(item.expected);
    });
  });
  test("sortDir prop", () => {
    let searchParams = new SearchParams();
    expect(searchParams.sortDir).toBeNull();

    searchParams = new SearchParams({ sort: null });
    expect(searchParams.sortDir).toBeNull();

    searchParams = new SearchParams({ sort: undefined });
    expect(searchParams.sortDir).toBeNull();

    searchParams = new SearchParams({ sort: "" });
    expect(searchParams.sortDir).toBeNull();
    const arrange = [
      { sortDir: null as any, expected: "asc" },
      { sortDir: undefined, expected: "asc" },
      { sortDir: "", expected: "asc" },
      { sortDir: 0, expected: "asc" },
      { sortDir: "fake", expected: "asc" },
      { sortDir: "asc", expected: "asc" },
      { sortDir: "ASC", expected: "asc" },
      { sortDir: "desc", expected: "desc" },
      { sortDir: "DESC", expected: "desc" },
    ];
    arrange.forEach((item) => {
      expect(new SearchParams({ sort: "field", sortDir: item.sortDir }).sortDir).toBe(
        item.expected
      );
    });
  });
  test("filter prop", () => {
    const searchParams = new SearchParams();
    expect(searchParams.filter).toBeNull();
    const arrange = [
      { filter: null as any, expected: null as any },
      { filter: undefined, expected: null },
      { filter: "", expected: null },
      { filter: "field", expected: "field" },
      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: 5.5, expected: "5.5" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
      { filter: {}, expected: "[object Object]" },
    ];
    arrange.forEach((item) => {
      expect(new SearchParams({ filter: item.filter }).filter).toBe(item.expected);
    });
  });
});
