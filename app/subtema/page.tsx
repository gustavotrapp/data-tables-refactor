import { db } from "../db/db";
import { SubtemaTable } from "./components/subtema_table";
import { TemaSelect } from "./components/tema_select";
import { getSubTemas } from "./functions/get_subtemas";

export default async function Page() {
  const { subtemas, filters, total } = await getSubTemas();
  const temas = await db.tema.findMany();

  return (
    <div>
      <div className="pt-20 px-20">
        <TemaSelect value={filters.temaId} temas={temas} />
      </div>
      <div className="pt-20 px-20">
        <SubtemaTable subtemas={subtemas} filters={filters} total={total} />
      </div>
    </div>
  );
}
