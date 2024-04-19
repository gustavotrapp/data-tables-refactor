import { Prisma } from "@prisma/client";
import { Filters } from "../../types/filters";
import { useEffect, useState } from "react";
import { updateFilter } from "../../functions/filters/update_filter";
import { usePathname } from "next/navigation";

export const Pagination = <F extends Filters>({
  total,
  tableName,
  filters,
  defaultFilters,
}: {
  tableName: Prisma.ModelName;
  filters: Partial<F>;
  total: number;
  defaultFilters?: Partial<F>;
}) => {
  const path = usePathname();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(total / filters.take);
    const currentPage = Math.ceil(filters.skip / filters.take) + 1;
    setPages(
      new Array(totalPages)
        .fill(null)
        .map((_, i) => i + (currentPage - 1 === 0 ? 1 : currentPage - 1))
        .filter(
          (page) =>
            page >= (currentPage - 1 === 0 ? 1 : currentPage - 1) &&
            page <=
              currentPage +
                Math.min(
                  currentPage - 1 === 0 ? 4 : 3,
                  Math.abs(totalPages - currentPage)
                )
        )
    );
  }, [filters.skip, filters.take, total]);

  return (
    <div className="row">
      <div className="col-sm-5">
        <div className="dataTables_info">
          Exibindo {filters.skip + 1} a{" "}
          {Math.min(filters.skip + filters.take, total)} de {total}
        </div>
      </div>
      <div className="col-sm-7">
        <div className="dataTables_paginate paging_simple_numbers">
          <ul className="pagination">
            <li
              className={
                filters.skip !== 0
                  ? "paginate_button previous"
                  : "paginate_button previous disabled"
              }
              onClick={() => {
                if (filters.skip !== 0) {
                  updateFilter({
                    filter: "skip",
                    path: path,
                    table: tableName,
                    value: filters.skip - filters.take,
                    defaultFilters: defaultFilters,
                  });
                }
              }}
            >
              <a>Anterior</a>
            </li>
            {pages.length ? (
              pages.map((page) => (
                <li
                  className={
                    Math.ceil(filters.skip / filters.take) + 1 === page
                      ? "paginate_button active"
                      : "paginate_button"
                  }
                  key={page}
                  onClick={() => {
                    const skip = filters.take * (page - 1);
                    updateFilter({
                      filter: "skip",
                      path: path,
                      table: tableName,
                      value: skip,
                      defaultFilters: defaultFilters,
                    });
                  }}
                >
                  <a className="hover:cursor-pointer">{page}</a>
                </li>
              ))
            ) : (
              <li className="paginate_button active" key={pages.length}>
                <a className="hover:cursor-pointer">1</a>
              </li>
            )}
            <li
              className={
                filters.skip + filters.take < total
                  ? "paginate_button next"
                  : "paginate_button next disabled"
              }
              onClick={() => {
                if (filters.skip + filters.take < total) {
                  const skip = filters.take + filters.skip;
                  updateFilter({
                    filter: "skip",
                    path: path,
                    table: tableName,
                    value: skip,
                    defaultFilters: defaultFilters,
                  });
                }
              }}
            >
              <a>Próxima</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
