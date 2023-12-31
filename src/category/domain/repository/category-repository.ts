import { SearchableRepositoryInterface } from "@/shared/domain/repository/repository-contracts";
import { SearchParams as DefaultSearchParams } from "@/shared/domain/repository/search-params";
import { SearchResult as DefaultSearchResult } from "@/shared/domain/repository/search-result";
import Category from "../entities/category";

export type Filter = string;

export class SearchParams extends DefaultSearchParams<Filter> {}

export class SearchResult extends DefaultSearchResult<Category, Filter> {}

export interface CategoryRepository
  extends SearchableRepositoryInterface<
    Category,
    Filter,
    SearchParams,
    SearchResult
  > {}
