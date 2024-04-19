"use client";

import { ReactNode } from "react";

export const columnBuilderOptions = <T>(
  searchColumn?: string,
  orderColumn?: string,
  render?: (cell: T) => ReactNode
) => {
  return {
    render: (cell: (cell: T) => ReactNode) => {
      return columnBuilderOptions<T>(searchColumn, orderColumn, cell);
    },
    searchColumn: <SearchColumn extends string>(column: SearchColumn) => {
      return columnBuilderOptions<T>(column, orderColumn, render);
    },
    sortingColumn: (column: string) => {
      return columnBuilderOptions<T>(searchColumn, column, render);
    },
    build: () => {
      return [searchColumn, orderColumn, render] as const;
    },
  };
};
