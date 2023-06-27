import UseCase from "../../../@seedwork/application/usecase";
import CategoryRepository from "../../domain/repository/category-repository";

export default class ListCategoriesUseCase
  implements UseCase<ListCategoriesUseCase.Input, ListCategoriesUseCase.Output>
{
  constructor(
    private readonly categoryRepository: CategoryRepository.Repository
  ) {}

  async execute(
    input: ListCategoriesUseCase.Input
  ): Promise<ListCategoriesUseCase.Output> {
    const searchParams = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepository.search(searchParams);
    const { items, total, currentPage, perPage, lastPage } =
      searchResult.toJSON();
    const mappedItems = items.map((item) => item.toJSON());

    return {
      items: mappedItems,
      total,
      currentPage,
      perPage,
      lastPage,
    };
  }
}

export namespace ListCategoriesUseCase {
  export type Input = {
    page?: number;
    perPage?: number;
    sort?: string | null;
    sortDir?: SortDirection | null;
    filter?: Filter | null;
  };
  export type Output = {
    items: CategoryOutput[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
  };
  type SortDirection = "asc" | "desc";
  type Filter = string;
  type CategoryOutput = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
  };
}
