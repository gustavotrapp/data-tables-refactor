import { Table } from "@tanstack/react-table";

export const TableNoContent = <T,>({ table }: { table: Table<T> }) => {
  return (
    <tr>
      <td
        colSpan={table.getAllFlatColumns().length}
        valign="top"
        className="dataTables_empty"
      >
        Sem dados disponíveis na tabela
      </td>
    </tr>
  );
};
