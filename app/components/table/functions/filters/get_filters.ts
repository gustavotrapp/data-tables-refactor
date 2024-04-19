import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { genericInitialFilters } from "./generic_initial_filters";
import { Filters } from "../../types/filters";

export const getFilters = <F extends Filters>(tableName: Prisma.ModelName, defaultFilters?: Partial<F>): Partial<F> => {
    const filters = cookies().get(`${tableName}_filters`);
    if (!filters) return genericInitialFilters<F>(defaultFilters)
    const parsedFilters = JSON.parse(filters.value);
    return parsedFilters;
};