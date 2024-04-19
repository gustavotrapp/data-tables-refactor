import { Row } from "@tanstack/react-table";
import { TableCell } from "./table_cell";
import { useState } from "react";
import { TableCollapsedList } from "./table_collapsed_list";

export const TableRow = <T,>({ row }: { row: Row<T> }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
        {row.getVisibleCells().map((cell, idx) => (
          <TableCell key={cell.id} cell={cell} idx={idx} setOpen={setOpen} />
        ))}
      </tr>
      {open && <TableCollapsedList row={row} />}
    </>
  );
};
