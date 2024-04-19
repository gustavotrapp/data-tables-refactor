import { Table } from "@tanstack/react-table";
import { TableRow } from "./table_row";
import { TableNoContent } from "./table_no_content";

export const TableBody = <T,>({
  table,
}: {
  table: Table<T>;
}) => {
  return (
    <tbody>
      {table.getRowModel().rows?.length ? (
        table
          .getRowModel()
          .rows.map((row) => <TableRow key={row.id} row={row} />)
      ) : (
        <TableNoContent table={table} />
      )}
    </tbody>
  );
};
