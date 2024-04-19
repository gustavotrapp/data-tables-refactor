import { HeaderGroup } from "@tanstack/react-table";
import { TableHeader } from "./table_header";
import { Filters } from "../../types/filters";
import { Prisma } from "@prisma/client";

export const TableHeaders = <T, F extends Filters>(
  props: TableHeadersProps<T, F>
) => {
  const { tableName, headerGroup, defaultFilters, headerToOrder, filters } = props;

  return (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header, idx) => (
        <TableHeader
          key={header.id}
          header={header}
          idx={idx}
          filters={filters}
          defaultFilters={defaultFilters}
          tableName={tableName}
          headerToOrder={headerToOrder}
        />
      ))}
    </tr>
  );
};

export type TableHeadersProps<T, F extends Filters> = {
  headerGroup: HeaderGroup<T>;
  defaultFilters: Partial<F>;
  tableName: Prisma.ModelName;
  headerToOrder: Record<string, string>;
  filters: Partial<F>;

};
