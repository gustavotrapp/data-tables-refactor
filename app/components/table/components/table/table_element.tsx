import { Table } from "@tanstack/react-table";
import { Filters } from "../../types/filters";
import { TableBody } from "./table_body";
import { useTableContent } from "./table_context";
import { TableHead } from "./table_head";
import { Prisma } from "@prisma/client";

export const TableElement = <T, F extends Filters>(
  props: TableElementProps<T, F>
) => {
  const { table, tableName, defaultFilters, headerToOrder, filters } = props;
  const { hiddenColumns } = useTableContent();
  const collapsed = hiddenColumns.some((col) => col !== null);

  const className = collapsed
    ? "table table-striped table-bordered dt-responsive jambo_table dataTables table-select dataTable no-footer dtr-inline collapsed"
    : "table table-striped table-bordered dt-responsive jambo_table dataTables table-select dataTable no-footer dtr-inline";

  return (
    <table className={className}>
      <TableHead
        table={table}
        headerToOrder={headerToOrder}
        defaultFilters={defaultFilters}
        tableName={tableName}
        filters={filters}
      />
      <TableBody table={table} />
    </table>
  );
};

export type TableElementProps<T, F extends Filters> = {
  filters: Partial<F>;
  defaultFilters?: Partial<F>;
  tableName: Prisma.ModelName;
  headerToOrder: Record<string, string>;
  searchColumns: readonly string[];
  table: Table<T>;
};
