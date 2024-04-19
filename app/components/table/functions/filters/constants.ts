import { Filters } from "../../types/filters";

export const INITIAL_FILTERS: Partial<Filters> = {
  orderBy: "asc" as "asc" | "desc",
  search: "",
  searchColumns: [],
  orderColumn: "id",
  skip: 0,
  take: 10,
};
export const EXCLUDED_FILTERS = ["search", "take", "skip", "orderColumn", "orderBy", "searchColumns"];
