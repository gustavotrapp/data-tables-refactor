import { Filters } from "../../types/filters";
import { INITIAL_FILTERS } from "./constants";

export const genericInitialFilters = <F extends Filters>(
  defaultValue?: Partial<F>
): Partial<F> => ({ ...INITIAL_FILTERS, ...defaultValue } as Partial<F>);
