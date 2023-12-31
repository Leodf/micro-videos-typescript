import { CategoryRepository } from "@/category/domain/repository";
import UseCase from "@/shared/application/usecase";

export default class GetCategoryUseCase
  implements UseCase<GetCategoryUseCase.Input, GetCategoryUseCase.Output>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(
    input: GetCategoryUseCase.Input
  ): Promise<GetCategoryUseCase.Output> {
    const category = await this.categoryRepository.findById(input.id);

    return category.toJSON();
  }
}

export namespace GetCategoryUseCase {
  export type Input = {
    id: string;
  };
  export type Output = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
  };
}
