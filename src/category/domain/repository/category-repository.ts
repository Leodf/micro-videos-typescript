import { SearchableRepositoryInterface } from "#seedwork/domain/repository/repository-contracts";
import { SearchParams as DefaultSearchParams } from "#seedwork/domain/repository/search-params";
import { SearchResult as DefaultSearchResult } from "#seedwork/domain/repository/search-result";
import Category from "../entities/category";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CategoryRepository;
