"use server";

import { updateFilter } from "../../components/table/functions/filters/update_filter";
import { SubTemaFilters } from "../types/subtema_filters";

export const subTemasFilterManager = <Filter extends keyof SubTemaFilters>(
  filter: Filter,
  value: SubTemaFilters[Filter]
) => updateFilter<SubTemaFilters>(filter, value, "subtema", "/subtema");
