"use client";

import { tema } from "@prisma/client";
import { usePathname } from "next/navigation";
import { subTemasFilterManager } from "../functions/subtema_filter_manager";

export const TemaSelect = ({
  temas,
  value,
}: {
  temas: tema[];
  value: string;
}) => {
  const path = usePathname();

  return (
    <select
      className="border border-gray-300 rounded-md px-2 mb-2"
      value={value}
      placeholder="Selecione..."
      onChange={(e) => subTemasFilterManager("temaId", e.target.value)}
    >
      {temas.map((tema) => (
        <option key={tema.id} value={tema.id}>
          {tema.nome}
        </option>
      ))}
    </select>
  );
};
