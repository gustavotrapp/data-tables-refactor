import { Prisma } from "@prisma/client";
import { Filters } from "../../types/filters";
import { Limit } from "../filters/limit";
import { Search } from "../filters/search";
import { Clear } from "../filters/clear";

export const TableToolbar = <T, F extends Filters>(
  props: TableToolbarProps<T, F>
) => {
  const { filters, defaultFilters, tableName, searchColumns } = props;

  return (
    <div className="row">
      <Limit
        filters={filters}
        table={tableName}
        defaultFilters={defaultFilters}
      />
      <div className="col-sm-9">
        <Search
          searchColumns={searchColumns}
          table={tableName}
          defaultFilters={defaultFilters}
          filters={filters}
        />
        <Clear table={tableName} defaultFilters={defaultFilters} />
      </div>
    </div>
  );
};

export type TableToolbarProps<T, F extends Filters> = {
  filters: Partial<F>;
  defaultFilters?: Partial<F>;
  tableName: Prisma.ModelName;
  searchColumns: readonly string[];
};
