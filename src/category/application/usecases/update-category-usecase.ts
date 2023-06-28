import CategoryRepository from "category/domain/repository/category-repository";
import UseCase from "../../../@seedwork/application/usecase";

export default class UpdateCategoryUseCase
  implements UseCase<UpdateCategoryUseCase.Input, UpdateCategoryUseCase.Output>
{
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository
  ) {}

  async execute(
    input: UpdateCategoryUseCase.Input
  ): Promise<UpdateCategoryUseCase.Output> {
    const { id, name, description, isActive } = input;
    const category = await this.categoryRepository.findById(id);
    category.update({ name, description });
    if (isActive === true) {
      category.activate();
    }
    if (isActive === false) {
      category.deactivate();
    }

    await this.categoryRepository.update(category);

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}

export namespace UpdateCategoryUseCase {
  export type Input = {
    id: string;
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
