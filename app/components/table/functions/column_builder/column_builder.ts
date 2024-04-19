import { AccessorFn, ColumnDef } from "@tanstack/react-table";
import { columnBuilderOptions } from "./column_builder_options";
import { ReturnTypeOrIndex } from "../../types/return_type_or_index";
import { ACCESSOR_FUNCTIONS_SHOULD_HAVE_SEARCH_COLUMN_ORDER_COLUMN_AND_RENDER } from "./errors";

export const columnBuilder = <T>(
  columns: ColumnDef<T>[] = [],
  headerToOrderColumn: Record<string, string> = {} as const,
  searchColumns: ReadonlyArray<string> = <string[]>[]
) => {
  return {
    addColumn: <Accessor extends AccessorFn<T> | keyof T>(
      header: string,
      accessor: Accessor,
      options: (
        opts: ReturnType<
          typeof columnBuilderOptions<ReturnTypeOrIndex<T, Accessor>>
        >
      ) => ReturnType<
        typeof columnBuilderOptions<ReturnTypeOrIndex<T, Accessor>>
      >
    ) => {
      const acc =
        typeof accessor === "string"
          ? { accessorKey: accessor }
          : { accessorFn: accessor };

      const config = options(
        columnBuilderOptions<ReturnTypeOrIndex<T, Accessor>>()
      );
      const [searchColumn, orderColumn, render] = config.build();

      if (
        typeof accessor !== "string" &&
        (!searchColumn || !orderColumn || !render)
      )
        throw new Error(
          ACCESSOR_FUNCTIONS_SHOULD_HAVE_SEARCH_COLUMN_ORDER_COLUMN_AND_RENDER
        );

      return columnBuilder<T>(
        [
          ...columns,
          {
            id: header,
            header,
            ...acc,
            cell: (info) =>
              render(info.getValue<ReturnTypeOrIndex<T, Accessor>>()),
          },
        ],
        { ...headerToOrderColumn, [header]: orderColumn },
        [...searchColumns, searchColumn]
      );
    },
    build: () => {
      return [columns, headerToOrderColumn, searchColumns] as const;
    },
  };
};
