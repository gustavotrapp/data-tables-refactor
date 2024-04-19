"use client";

import { subtema } from "@prisma/client";
import { columnBuilder } from "../../components/table/functions/column_builder/column_builder";
import Link from "next/link";

export const [subtemaCols, headerToOrder, searchColumns] =
  columnBuilder<subtema>()
    .addColumn("Número", "id", (opts) =>
      opts
        .searchColumn("id")
        .sortingColumn("id")
        .render((cell) => <Link className="hover:underline" href={`/subtema/${cell}`}>{cell}</Link>)
    )
    .addColumn(
      "Nome",
      (row) => ({ id: row.id, nome: row.nome }),
      (opts) =>
        opts
          .sortingColumn("nome")
          .searchColumn("nome")
          .render((cell) => (
            <Link className="hover:underline" href={`/subtema/${cell.id}`}>{cell.nome}</Link>
          ))
    )
    .build();
