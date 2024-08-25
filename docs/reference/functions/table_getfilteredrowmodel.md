---
id: table_getFilteredRowModel
title: table_getFilteredRowModel
---

# Function: table\_getFilteredRowModel()

```ts
function table_getFilteredRowModel<TFeatures, TData>(table): RowModel<TFeatures, TData>
```

## Type Parameters

• **TFeatures** *extends* [`TableFeatures`](../interfaces/tablefeatures.md)

• **TData** *extends* `unknown`

## Parameters

• **table**: [`Table`](../type-aliases/table.md)\<`TFeatures`, `TData`\>

## Returns

`RowModel`\<`TFeatures`, `TData`\>

## Defined in

[features/column-filtering/ColumnFiltering.utils.ts:189](https://github.com/TanStack/table/blob/b1e6b79157b0debc7222660572b06c8b857f4605/packages/table-core/src/features/column-filtering/ColumnFiltering.utils.ts#L189)