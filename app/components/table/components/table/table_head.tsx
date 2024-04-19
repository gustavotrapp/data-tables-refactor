import { Table } from "@tanstack/react-table";
import { TableHeaders } from "./table_headers";
import { Filters } from "../../types/filters";
import { Prisma } from "@prisma/client";

export const TableHead = <T, F extends Filters>(
  props: TableHeadProps<T, F>
) => {
  const { table, tableName, defaultFilters, headerToOrder, filters } = props;
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableHeaders
          key={headerGroup.id}
          headerGroup={headerGroup}
          filters={filters}
          defaultFilters={defaultFilters}
          tableName={tableName}
          headerToOrder={headerToOrder}
        />
      ))}
    </thead>
  );
};

export type TableHeadProps<T, F extends Filters> = {
  table: Table<T>;
  defaultFilters: Partial<F>;
  tableName: Prisma.ModelName;
  headerToOrder: Record<string, string>;
  filters: Partial<F>;

};
