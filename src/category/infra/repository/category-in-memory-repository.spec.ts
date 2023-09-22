import Category from "@/category/domain/entities/category";
import CategoryInMemoryRepository from "./category-in-memory-repository";
import { SearchParams } from "@/category/domain/repository";

describe("CategoryInMemoryRepository Unit Tests", () => {
  let categoryInMemoryRepository: CategoryInMemoryRepository;

  beforeEach(() => {
    categoryInMemoryRepository = new CategoryInMemoryRepository();
  });

  test("should no filter items when param is null", async () => {
    const categories = [new Category({ name: "c" })];
    const itemsWithNoFilter = await categoryInMemoryRepository["applyFilter"](
      categories,
      null
    );
    expect(itemsWithNoFilter).toStrictEqual(categories);
  });
  test("should filter items per name with any string term from start to end of name value", async () => {
    const categories = [
      new Category({ name: "teste" }),
      new Category({ name: "Teste" }),
      new Category({ name: "any name" }),
      new Category({ name: "TESTE" }),
      new Category({ name: "tEStE" }),
    ];
    let itemsWithFilter = await categoryInMemoryRepository["applyFilter"](
      categories,
      "teste"
    );
    expect(itemsWithFilter).toStrictEqual([
      categories[0],
      categories[1],
      categories[3],
      categories[4],
    ]);
    itemsWithFilter = await categoryInMemoryRepository["applyFilter"](
      categories,
      "am"
    );
    expect(itemsWithFilter).toStrictEqual([categories[2]]);
  });
  test("should sort default the categories by createdAt desc", async () => {
    const createdAt = new Date();
    const categories = [
      new Category({
        name: "teste",
        createdAt: new Date(createdAt.getTime() + 50),
      }),
      new Category({
        name: "Teste",
        createdAt: new Date(createdAt.getTime() + 100),
      }),
      new Category({
        name: "any name",
        createdAt: new Date(createdAt.getTime() + 300),
      }),
      new Category({
        name: "TESTE",
        createdAt: new Date(createdAt.getTime() + 200),
      }),
      new Category({
        name: "tEStE",
        createdAt: new Date(createdAt.getTime() + 400),
      }),
    ];
    let itemsFiltered = await categoryInMemoryRepository["applySort"](
      categories,
      null,
      null
    );
    expect(itemsFiltered).toStrictEqual([
      categories[4],
      categories[2],
      categories[3],
      categories[1],
      categories[0],
    ]);
  });
  test("should sort the categories ignoring by default createdAt desc", async () => {
    const createdAt = new Date();
    const categories = [
      new Category({
        name: "teste",
        createdAt: new Date(createdAt.getTime() + 50),
      }),
      new Category({
        name: "Teste",
        createdAt: new Date(createdAt.getTime() + 100),
      }),
      new Category({
        name: "Any name",
        createdAt: new Date(createdAt.getTime() + 300),
      }),
      new Category({
        name: "TESTE",
        createdAt: new Date(createdAt.getTime() + 200),
      }),
      new Category({
        name: "tEStE",
        createdAt: new Date(createdAt.getTime() + 400),
      }),
    ];
    let itemsFiltered = await categoryInMemoryRepository["applySort"](
      categories,
      "name",
      "asc"
    );
    expect(itemsFiltered).toStrictEqual([
      categories[2],
      categories[3],
      categories[1],
      categories[4],
      categories[0],
    ]);
  });
  test("should not sort if has not sortableFields property", async () => {
    const categories = [
      new Category({ name: "teste" }),
      new Category({ name: "Teste" }),
      new Category({ name: "Any name" }),
      new Category({ name: "TESTE" }),
      new Category({ name: "tEStE" }),
    ];
    categoryInMemoryRepository["items"] = categories;
    const searchParams = new SearchParams({
      sort: "name",
    });
    let itemsFiltered = await categoryInMemoryRepository.search(searchParams);
    expect(itemsFiltered.items).toStrictEqual([
      categories[2],
      categories[3],
      categories[1],
      categories[4],
      categories[0],
    ]);
  });
});
