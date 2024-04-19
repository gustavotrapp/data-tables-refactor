import { usePathname } from "next/navigation";
import { clearFilters } from "../../functions/filters/clear_filters";
import { Prisma } from "@prisma/client";
import { Filters } from "../../types/filters";

export const Clear = <F extends Filters>(props: ClearProps<F>) => {
  const { table, defaultFilters } = props;
  const path = usePathname();

  return (
    <div className="dt-buttons btn-group">
      <a
        className="btn btn-default btn-sm btn-info btn-limpar-filtros"
        onClick={() =>
          clearFilters({
            path: path,
            table: table,
            defaultFilters: defaultFilters,
          })
        }
      >
        <span>
          <i className="fa fa-filter"></i> Limpar filtros
        </span>
      </a>
    </div>
  );
};

export type ClearProps<F extends Filters> = {
  table: Prisma.ModelName;
  defaultFilters?: Partial<F>;
};
