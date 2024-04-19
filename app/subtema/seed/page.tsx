import { randomInt } from "crypto";
import { db } from "../../db/db";

export default async function Page() {
  const temas = new Array(100)
    .fill(0)
    .map(() => ({ nome: `Tema ${randomInt(100)}` }));

  await Promise.all(
    temas.map(async (tema) => {
      const { id } = await db.tema.create({ data: tema });

      const subtemas = new Array(100)
        .fill(0)
        .map(() => ({ nome: `Subtema ${randomInt(100)}`, temaId: id }));

      await Promise.all(
        subtemas.map(async (subtema) => {
          await db.subtema.create({ data: subtema });
        })
      );
    })
  );

  return <></>;
}
