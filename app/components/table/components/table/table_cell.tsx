import { Cell, flexRender } from "@tanstack/react-table";
import { useTableContent } from "./table_context";
import { Dispatch, SetStateAction } from "react";

export const TableCell = <T,>({
  cell,
  idx,
  setOpen,
}: {
  cell: Cell<T, unknown>;
  idx: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { hiddenColumns } = useTableContent();

  if (hiddenColumns.includes(idx)) return <></>;

  if (!idx && hiddenColumns.length) {
    return (
      <td
        key={cell.id}
        className="sorting_1"
        onClick={() => setOpen((prev) => !prev)}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    );
  }

  return (
    <td key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
