import CategoryRepository from "category/domain/repository/category-repository";
import UseCase from "../../../@seedwork/application/usecase";

export default class DeleteCategoryUseCase
  implements UseCase<DeleteCategoryUseCase.Input, DeleteCategoryUseCase.Output>
{
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository
  ) {}

  async execute(
    input: DeleteCategoryUseCase.Input
  ): Promise<DeleteCategoryUseCase.Output> {
    await this.categoryRepository.delete(input.id);
    return `Category ${input.id} has been deleted`;
  }
}

export namespace DeleteCategoryUseCase {
  export type Input = {
    id: string;
  };
  export type Output = string;
}
