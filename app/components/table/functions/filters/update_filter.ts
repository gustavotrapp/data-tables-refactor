"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Filters } from "../../types/filters";
import { genericInitialFilters } from "./generic_initial_filters";

export const updateFilter = <F extends Filters, Filter extends keyof F = keyof F>(
  filter: Filter,
  value: F[Filter],
  tableName: Prisma.ModelName,
  path: string,
  defaultFilters?: Partial<F>
) => {
  const jar = cookies();
  const TABLE_FILTERS = `${tableName}_filters`;
  const filters = jar.get(TABLE_FILTERS);

  if (!filters) {
    jar.set(
      TABLE_FILTERS,
      JSON.stringify({
        ...genericInitialFilters<F>(defaultFilters),
        [filter]: value,
      })
    );
  }

  if (filters) {
    const parsedFilters = JSON.parse(filters.value);
    jar.set(
      TABLE_FILTERS,
      JSON.stringify({
        ...parsedFilters,
        [filter]: value,
      })
    );
  }

  revalidatePath(path);
  redirect(path);
};
