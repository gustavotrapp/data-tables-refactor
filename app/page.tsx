import { sqlExpression } from "mysql-all-in-one/QueryBuilder/sql_expression";
import { ASC, DESC } from "./shared/query_builder/functions/constants";
import { queryBuilder } from "./shared/query_builder/functions/query_builder/query_builder";
import { QueryBuilder } from "mysql-all-in-one";

export default async function Page() {
  const sql = queryBuilder("tema")
    .join("subtema", (opts) => opts.on("subtema.temaId", "tema.id"))
    .select(({ groupConcat, count }) => ({
      id: "tema.id",
      nome: "tema.nome",
      temas: groupConcat("subtema.nome", ", "),
      subtemas: count("subtema.id"),
    }))
    .where(({ eq, rlike, gte }) => [
      eq("tema.id", 1),
      rlike("tema.nome", "Tema"),
      gte("subtema.id", 5),
    ])
    .orderBy(({ strToDate }) => ({
      "subtema.id": ASC,
      __expression: [strToDate("tema.nome", "%Y-%m-%d", DESC)],
    }))
    .groupBy("tema.id")
    .limit(10)
    .offset(0)
    .build();

  return (
    <div className="flex flex-col gap-5">
      {QueryBuilder.select(sql).toString()}
    </div>
  );
}
