import { getMemoOptions, memo } from '../../utils'
import { filterRows } from '../column-filtering/filterRowsUtils'
import { _table_getState } from '../../core/table/Tables.utils'
import {
  table_getFilteredRowModel,
  table_getPreFilteredRowModel,
} from '../column-filtering/ColumnFiltering.utils'
import type { RowData } from '../../types/type-utils'
import type { TableFeatures } from '../../types/TableFeatures'
import type { RowModel } from '../../types/RowModel'
import type { Table } from '../../types/Table'
import type { Row } from '../../types/Row'

export function createFacetedRowModel<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(): (
  table: Table<TFeatures, TData>,
  columnId: string,
) => () => RowModel<TFeatures, TData> {
  return (table, columnId) =>
    memo(
      () => [
        table_getPreFilteredRowModel(table),
        _table_getState(table).columnFilters,
        _table_getState(table).globalFilter,
        table_getFilteredRowModel(table),
      ],
      (preRowModel, columnFilters, globalFilter) => {
        if (
          !preRowModel.rows.length ||
          (!columnFilters?.length && !globalFilter)
        ) {
          return preRowModel
        }

        const filterableIds = [
          ...(columnFilters?.map((d) => d.id).filter((d) => d !== columnId) ??
            []),
          globalFilter ? '__global__' : undefined,
        ].filter(Boolean) as Array<string>

        const filterRowsImpl = (row: Row<TFeatures, TData>) => {
          // Horizontally filter rows through each column
          for (const colId of filterableIds) {
            if (row.columnFilters[colId] === false) {
              return false
            }
          }
          return true
        }

        return filterRows(preRowModel.rows, filterRowsImpl, table)
      },
      getMemoOptions(table.options, 'debugTable', 'getFacetedRowModel'),
    )
}
