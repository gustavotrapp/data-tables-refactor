"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filters } from "./types/filters";
import { Prisma } from "@prisma/client";
import { Pagination } from "./components/filters/pagination";
import { TableContentProvider } from "./components/table/table_context";
import { TableElement } from "./components/table/table_element";
import { TableToolbar } from "./components/table/table_toolbar";

export const Table = <T, F extends Filters>(props: TableProps<T, F>) => {
  const {
    data,
    columns,
  } = props;
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
      <TableToolbar {...props} />
      <TableContentProvider>
        <div className="col-sm-12 font-[13px]">
          <TableElement table={table} {...props} />
        </div>
      </TableContentProvider>
      <Pagination {...props} />
    </div>
  );
};

export type TableProps<T, F extends Filters> = {
  data: T[];
  total: number;
  columns: ColumnDef<T>[];
  filters: Partial<F>;
  defaultFilters?: Partial<F>;
  tableName: Prisma.ModelName;
  headerToOrder: Record<string, string>;
  searchColumns: readonly string[];
};
