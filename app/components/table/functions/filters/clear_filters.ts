"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Filters } from "../../types/filters";
import { genericInitialFilters } from "./generic_initial_filters";

export const clearFilters = <F extends Filters>(params: ClearFiltersParams<F>) => {
    const { defaultFilters, table, path } = params;
    cookies().delete(`${table}_filters`);
    cookies().set(`${table}_filters`, JSON.stringify(genericInitialFilters(defaultFilters)));
    revalidatePath(path);
    redirect(path);
};

export type ClearFiltersParams<F extends Filters> = {
    defaultFilters?: Partial<F>;
    table: string;
    path: string;
};