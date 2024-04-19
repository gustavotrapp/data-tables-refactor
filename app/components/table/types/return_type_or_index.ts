import { AccessorFn } from "@tanstack/react-table";

export type ReturnTypeOrIndex<
  Indexable,
  IndexOrFn extends keyof Indexable | AccessorFn<Indexable>
> = IndexOrFn extends AccessorFn<Indexable>
  ? ReturnType<IndexOrFn>
  : IndexOrFn extends keyof Indexable
  ? Indexable[IndexOrFn]
  : never;