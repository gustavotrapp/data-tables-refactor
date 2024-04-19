import { cache } from "react";
import { createWhere } from "../../components/table/functions/filters/create_where";
import { db } from "../../db/db";
import { getFilters } from "../../components/table/functions/filters/get_filters";
import { SubTemaFilters } from "../types/subtema_filters";

export const getSubTemas = cache(async () => {
  const filters = getFilters<SubTemaFilters>("subtema");
  const where = createWhere(filters, true);
  const total = await db.subtema.count({ where });
  const subtemas = await db.subtema.findMany({
    where,
    orderBy: {
      [filters.orderColumn]: filters.orderBy,
    },
    skip: filters.skip,
    take: filters.take,
  });
  return { subtemas, total, filters };
});
