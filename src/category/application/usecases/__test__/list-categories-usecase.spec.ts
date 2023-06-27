import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory-repository";
import ListCategoriesUseCase from "../list-categories-usecase";

const categories = [
  new Category({ name: "teste" }),
  new Category({ name: "TeSTE" }),
  new Category({ name: "any name" }),
  new Category({ name: "tESTe" }),
  new Category({ name: "Any name" }),
  new Category({ name: "Teste" }),
];

describe("ListCategoriesUseCase Unit Tests", () => {
  let usecase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new ListCategoriesUseCase(repository);
  });

  test("list categories with no search param and return an empty array", async () => {
    const spySearch = jest.spyOn(repository, "search");
    const result = await usecase.execute({});
    expect(spySearch).toBeCalledTimes(1);
    expect(result).toStrictEqual({
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 15,
      lastPage: 0,
    });
  });
  test("should return categories ordered by createdAt using empty input param", async () => {
    const date = new Date();
    const categories = [
      new Category({ name: "Teste 1", createdAt: date }),
      new Category({
        name: "Teste 2",
        createdAt: new Date(date.getTime() + 1000),
      }),
    ];
    repository["items"] = categories;
    const result = await usecase.execute({});
    expect(result).toStrictEqual({
      items: [categories[1].toJSON(), categories[0].toJSON()],
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    });
  });
  test("should return categories using pagination, sort and filter", async () => {
    const categories = [
      new Category({ name: "a" }),
      new Category({ name: "AAA" }),
      new Category({ name: "AaA" }),
      new Category({ name: "b" }),
      new Category({ name: "c" }),
    ];
    repository["items"] = categories;

    let result = await usecase.execute({
      page: 1,
      perPage: 2,
      sort: "name",
      filter: "a",
    });
    expect(result).toStrictEqual({
      items: [categories[1].toJSON(), categories[2].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });

    result = await usecase.execute({
      page: 2,
      perPage: 2,
      sort: "name",
      filter: "a",
    });
    expect(result).toStrictEqual({
      items: [categories[0].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });

    result = await usecase.execute({
      page: 1,
      perPage: 2,
      sort: "name",
      sortDir: "desc",
      filter: "a",
    });
    expect(result).toStrictEqual({
      items: [categories[0].toJSON(), categories[2].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });
  });
});
