import { Row } from "@tanstack/react-table";
import { TableCollapsedItem } from "./table_collapsed_item";
import { useTableContent } from "./table_context";

export const TableCollapsedList = <T,>({ row }: { row: Row<T> }) => {
  const { hiddenColumns } = useTableContent();

  return (
    <tr className="child" key={`${row.id}${hiddenColumns.length}`}>
      <td
        className="child"
        colSpan={hiddenColumns.filter((hiddenCol) => hiddenCol !== null).length}
      >
        <ul>
          {row.getVisibleCells().map((cell, idx) => (
            <TableCollapsedItem key={cell.id} cell={cell} idx={idx} />
          ))}
        </ul>
      </td>
    </tr>
  );
};
