"use client";

import { subtema } from "@prisma/client";
import { Table } from "../../components/table/table";
import { headerToOrder, searchColumns, subtemaCols } from "../functions/get_subtema_cols";
import { SubTemaFilters } from "../types/subtema_filters";

export const SubtemaTable = ({
  subtemas,
  filters,
  total,
}: {
  subtemas: subtema[];
  filters: Partial<SubTemaFilters>;
  total: number;
}) => {
  return (
    <Table
      total={total}
      columns={subtemaCols}
      data={subtemas}
      tableName="subtema"
      filters={filters}
      headerToOrder={headerToOrder}
      searchColumns={searchColumns}
    />
  );
};
