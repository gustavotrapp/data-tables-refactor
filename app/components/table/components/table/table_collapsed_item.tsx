import { Cell, flexRender } from "@tanstack/react-table";
import { useTableContent } from "./table_context";

export const TableCollapsedItem = <T,>({
  cell,
  idx,
}: {
  idx: number;
  cell: Cell<T, unknown>;
}) => {
  const { hiddenColumns } = useTableContent();

  if (!hiddenColumns.includes(idx)) return <></>;

  return (
    <li key={cell.id}>
      <span className="dtr-title">Bolognse</span>
      <span className="dtr-data">
        <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
      </span>
    </li>
  );
};
