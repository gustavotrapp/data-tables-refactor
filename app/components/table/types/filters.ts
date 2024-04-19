export type Filters = {
  search: string;
  searchColumns: readonly string[];
  take: number;
  skip: number;
  orderBy: "asc" | "desc";
  orderColumn: string;
};
