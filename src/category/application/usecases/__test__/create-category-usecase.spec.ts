import CategoryInMemoryRepository from "@/category/infra/repository/category-in-memory-repository";
import CreateCategoryUseCase from "../create-category-usecase";

describe("CreateCategoryUseCase Unit Tests", () => {
  let usecase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new CreateCategoryUseCase(repository);
  });

  test("should create a category", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    const result = await usecase.execute({ name: "Teste" });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: repository["items"][0].id,
      name: "Teste",
      description: null,
      isActive: true,
      createdAt: repository["items"][0].createdAt,
    });
  });
});
