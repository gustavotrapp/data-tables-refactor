import { Prisma } from "@prisma/client";
import { Filters } from "../../types/filters";
import { updateFilter } from "../../functions/filters/update_filter";
import { usePathname } from "next/navigation";

export const Limit = <F extends Filters>(props: LimitProps<F>) => {
  const { table, filters, defaultFilters } = props;
  const path = usePathname();

  return (
    <div className="col-sm-3">
      <div>
        <label>
          Exibindo
          <select
            value={filters.take}
            onChange={(e) =>
              updateFilter({
                filter: "take",
                table: table,
                value: parseInt(e.target.value),
                path: path,
                defaultFilters: defaultFilters,
              })
            }
            name="datatable-projeto_length"
            className="form-control input-sm mx-2"
          >
            {[10, 25, 50, 100].map((value, idx) => (
              <option key={idx} value={value}>
                {value}
              </option>
            ))}
          </select>
          itens
        </label>
      </div>
    </div>
  );
};

export type LimitProps<F extends Filters> = {
  table: Prisma.ModelName;
  defaultFilters?: Partial<F>;
  filters: Partial<F>;
};
