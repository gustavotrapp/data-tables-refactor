import { Filters } from "../../types/filters";
import { EXCLUDED_FILTERS } from "./constants";

export const createWhere = <F extends Filters>(
  filters: Partial<F>,
  prisma: boolean = false
) => {
  const searchColumns = filters.searchColumns ?? [];
  
  if (prisma) {
    const search = filters.search
      ? {
          OR: [
            ...searchColumns.map((column) => ({
              [column]: { contains: filters.search },
            })),
          ],
        }
      : {};
    return Object.entries(filters).reduce((acc, [key, value]) => {
        if (EXCLUDED_FILTERS.includes(key)) return acc;
        return { ...acc, [key]: value };
    }, search);
  }

  return {};
};
