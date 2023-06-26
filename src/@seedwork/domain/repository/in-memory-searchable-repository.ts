import Entity from "../entity/entity";
import { InMemoryRepository } from "./in-memory-repository";
import { SearchableRepositoryInterface } from "./repository-contracts";
import { SearchParams, SortDirection } from "./search-params";
import { SearchResult } from "./search-result";

export default abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage
    );
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter,
    });
  }
  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;
  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: SortDirection | null
  ): Promise<E[]> {
    if (!sort && !this.sortableFields.includes(sort)) {
      return items;
    }
    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDir === "asc" ? -1 : 1;
      }
      if (a.props[sort] > b.props[sort]) {
        return sortDir === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  protected async applyPaginate(
    items: E[],
    page: SearchParams["page"],
    perPage: SearchParams["perPage"]
  ): Promise<E[]> {
    const start = (page - 1) * perPage; // 1 * 15 = 15
    const limit = start + perPage; // 15 + 15 = 30
    return items.slice(start, limit);
  }
}