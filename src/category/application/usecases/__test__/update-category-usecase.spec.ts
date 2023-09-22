import CategoryInMemoryRepository from "@/category/infra/repository/category-in-memory-repository";
import UpdateCategoryUseCase from "../update-category-usecase";
import Category from "@/category/domain/entities/category";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let usecase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new UpdateCategoryUseCase(repository);
  });
  test("should throw error when category not found", async () => {
    expect(() =>
      usecase.execute({ id: "fake id", name: "fake" })
    ).rejects.toThrow(`Entity not found using ID fake id`);
  });

  test("should update a category", async () => {
    const category = new Category({ name: "Movie" });
    const spyUpdate = jest.spyOn(repository, "update");
    repository["items"] = [category];
    let result = await usecase.execute({ id: category.id, name: "Teste" });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: category.id,
      name: "Teste",
      description: null,
      isActive: true,
      createdAt: category.createdAt,
    });
    result = await usecase.execute({
      id: category.id,
      name: "Teste",
      description: "some description",
    });
    expect(result).toStrictEqual({
      id: category.id,
      name: "Teste",
      description: "some description",
      isActive: true,
      createdAt: category.createdAt,
    });
    result = await usecase.execute({
      id: category.id,
      name: "Teste",
      description: "some description",
      isActive: false,
    });
    expect(result).toStrictEqual({
      id: category.id,
      name: "Teste",
      description: "some description",
      isActive: false,
      createdAt: category.createdAt,
    });
    result = await usecase.execute({
      id: category.id,
      name: "Teste",
    });
    expect(result).toStrictEqual({
      id: category.id,
      name: "Teste",
      description: "some description",
      isActive: false,
      createdAt: category.createdAt,
    });
    result = await usecase.execute({
      id: category.id,
      name: "Teste",
      isActive: true,
    });
    expect(result).toStrictEqual({
      id: category.id,
      name: "Teste",
      description: "some description",
      isActive: true,
      createdAt: category.createdAt,
    });
  });
});
