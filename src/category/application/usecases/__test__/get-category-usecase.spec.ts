import NotFoundError from "../../../../@seedwork/domain/errors/not-found-error";
import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory-repository";
import GetCategoryUseCase from "../get-category-usecase";

describe("GetCategoryUseCase Unit Tests", () => {
  let usecase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new GetCategoryUseCase(repository);
  });

  test("should throw error if category not exists", async () => {
    expect(() => usecase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    );
  });
  test("should get a category", async () => {
    const category = new Category({ name: "Teste" });
    repository["items"] = [category];

    const spyFindById = jest.spyOn(repository, "findById");
    const result = await usecase.execute({ id: category.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: repository["items"][0].id,
      name: "Teste",
      description: null,
      isActive: true,
      createdAt: repository["items"][0].createdAt,
    });
  });
});
