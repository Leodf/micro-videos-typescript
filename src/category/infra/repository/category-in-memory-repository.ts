import { SortDirection } from "@seedwork/domain/repository/search-params";
import Category from "category/domain/entities/category";
import CategoryRepository from "category/domain/repository/category-repository";
import InMemorySearchableRepository from "../../../@seedwork/domain/repository/in-memory-searchable-repository";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  protected sortableFields: string[] = ["name", "createdAt"];

  protected async applyFilter(
    items: Category[],
    filter: string
  ): Promise<Category[]> {
    if (!filter) return items;
    return items.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  protected async applySort(
    items: Category[],
    sort: string,
    sortDir: SortDirection
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, "createdAt", "desc")
      : super.applySort(items, sort, sortDir);
  }
}
