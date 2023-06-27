import CategoryRepository from "category/domain/repository/category-repository";
import UseCase from "../../../@seedwork/application/usecase";
import Category from "../../domain/entities/category";

export default class CreateCategoryUseCase
  implements UseCase<CreateCategoryUseCase.Input, CreateCategoryUseCase.Output>
{
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository
  ) {}

  async execute(
    input: CreateCategoryUseCase.Input
  ): Promise<CreateCategoryUseCase.Output> {
    const category = new Category(input);
    await this.categoryRepository.insert(category);
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}

export namespace CreateCategoryUseCase {
  export type Input = {
    name: string;
    description?: string;
    isActive?: boolean;
  };
  export type Output = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
  };
}
