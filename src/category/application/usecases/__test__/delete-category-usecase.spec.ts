import CategoryInMemoryRepository from "@/category/infra/repository/category-in-memory-repository";
import DeleteCategoryUseCase from "../delete-category-usecase";
import Category from "@/category/domain/entities/category";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let usecase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new DeleteCategoryUseCase(repository);
  });
  test("should throw error when category not found", async () => {
    expect(() => usecase.execute({ id: "fake id" })).rejects.toThrow(
      `Entity not found using ID fake id`
    );
  });

  test("should update a category", async () => {
    const category = new Category({ name: "Movie" });
    const spyDelete = jest.spyOn(repository, "delete");
    repository["items"] = [category];
    let result = await usecase.execute({ id: category.id });
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(result).toBe(`Category ${category.id} has been deleted`);
  });
});
