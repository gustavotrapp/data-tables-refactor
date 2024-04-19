"use client";

import { flexRender, Header } from "@tanstack/react-table";
import { Filters } from "../../types/filters";
import { updateFilter } from "../../functions/filters/update_filter";
import { usePathname } from "next/navigation";
import { Prisma } from "@prisma/client";
import { useTableContent } from "./table_context";

export const TableHeader = <T, F extends Filters>(
  props: TableHeaderProps<T, F>
) => {
  const { header, tableName, defaultFilters, headerToOrder, filters, idx } =
    props;
  const path = usePathname();
  const { hiddenColumns, addCellRefs } = useTableContent();

  if (hiddenColumns.includes(idx)) return <></>;
  if (!header.column.columnDef.header) {
    return <th ref={(ref) => addCellRefs(ref, idx)} id={header.id}></th>;
  }

  const className =
    header.id === header.column.columnDef.header && filters.orderBy === "desc"
      ? "font-bold sorting_desc"
      : header.id === header.column.columnDef.header
      ? "font-bold sorting_asc"
      : "font-bold sorting";

  return (
    <th
      key={header.id}
      ref={(ref) => addCellRefs(ref, idx)}
      onClick={() => {
        updateFilter({
          filter: "orderBy",
          value: filters.orderBy === "asc" ? "desc" : "asc",
          path: path,
          table: tableName,
          defaultFilters: defaultFilters,
        });
        updateFilter({
          filter: "orderColumn",
          value: headerToOrder[header.id],
          path: path,
          table: tableName,
          defaultFilters: defaultFilters,
        });
      }}
      className={className}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  );
};

export type TableHeaderProps<T, F extends Filters> = {
  header: Header<T, unknown>;
  defaultFilters: Partial<F>;
  tableName: Prisma.ModelName;
  headerToOrder: Record<string, string>;
  filters: Partial<F>;
  idx: number;
};
