"use client";

import { Prisma } from "@prisma/client";
import { Filters } from "../../types/filters";
import { updateFilter } from "../../functions/filters/update_filter";
import { usePathname } from "next/navigation";

export const Search = <F extends Filters>(props: SearchProps<F>) => {
  const { table, defaultFilters, filters, searchColumns } = props;
  const path = usePathname();
  return (
    <div className="dataTables_filter">
      <label>
        <input
          value={filters.search}
          onChange={(e) => {
            updateFilter({
              filter: "search",
              table: table,
              value: e.target.value,
              path: path,
              defaultFilters: defaultFilters,
            });
            updateFilter({
              filter: "searchColumns",
              table: table,
              value: searchColumns,
              path: path,
              defaultFilters: defaultFilters,
            });
          }}
          type="search"
          className="form-control input-sm"
          placeholder="Buscar..."
        />
      </label>
    </div>
  );
};

export type SearchProps<F extends Filters> = {
  table: Prisma.ModelName;
  defaultFilters?: Partial<F>;
  filters: Partial<F>;
  searchColumns: readonly string[];
};
