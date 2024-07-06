import { makeStateUpdater } from '../../utils'
import {
  cell_getIsAggregated,
  cell_getIsGrouped,
  cell_getIsPlaceholder,
  column_getAggregationFn,
  column_getAutoAggregationFn,
  column_getCanGroup,
  column_getGroupedIndex,
  column_getIsGrouped,
  column_getToggleGroupingHandler,
  column_toggleGrouping,
  row_getGroupingValue,
  row_getIsGrouped,
  table_getGroupedRowModel,
  table_getPreGroupedRowModel,
  table_resetGrouping,
  table_setGrouping,
} from './ColumnGrouping.utils'
import type {
  Cell,
  Column,
  Row,
  RowData,
  Table,
  TableFeature,
} from '../../types'
import type {
  ColumnDef_ColumnGrouping,
  TableOptions_ColumnGrouping,
  TableState_ColumnGrouping,
} from './ColumnGrouping.types'

export const ColumnGrouping: TableFeature = {
  _getDefaultColumnDef: <TData extends RowData>(): ColumnDef_ColumnGrouping<
    TData,
    unknown
  > => {
    return {
      aggregatedCell: (props) =>
        (props.getValue() as any)?.toString?.() ?? null,
      aggregationFn: 'auto',
    }
  },

  _getInitialState: (state): TableState_ColumnGrouping => {
    return {
      grouping: [],
      ...state,
    }
  },

  _getDefaultOptions: <TData extends RowData>(
    table: Partial<Table<TData>>,
  ): TableOptions_ColumnGrouping => {
    return {
      onGroupingChange: makeStateUpdater('grouping', table),
      groupedColumnMode: 'reorder',
    }
  },

  _createColumn: <TData extends RowData, TValue>(
    column: Column<TData, TValue>,
    table: Table<TData>,
  ): void => {
    column.toggleGrouping = () => column_toggleGrouping(column, table)

    column.getCanGroup = () => column_getCanGroup(column, table)

    column.getIsGrouped = () => column_getIsGrouped(column, table)

    column.getGroupedIndex = () => column_getGroupedIndex(column, table)

    column.getToggleGroupingHandler = () =>
      column_getToggleGroupingHandler(column)

    column.getAutoAggregationFn = () =>
      column_getAutoAggregationFn(column, table)

    column.getAggregationFn = () => column_getAggregationFn(column, table)
  },

  _createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setGrouping = (updater) => table_setGrouping(table, updater)

    table.resetGrouping = (defaultState) =>
      table_resetGrouping(table, defaultState)

    table.getPreGroupedRowModel = () => table_getPreGroupedRowModel(table)

    table.getGroupedRowModel = () => table_getGroupedRowModel(table)
  },

  _createRow: <TData extends RowData>(
    row: Row<TData>,
    table: Table<TData>,
  ): void => {
    row.getIsGrouped = () => row_getIsGrouped(row)

    row.getGroupingValue = (columnId) =>
      row_getGroupingValue(row, table, columnId)

    row._groupingValuesCache = {}
  },

  _createCell: <TData extends RowData, TValue>(
    cell: Cell<TData, TValue>,
    _table: Table<TData>,
  ): void => {
    const { column, row } = cell

    cell.getIsGrouped = () => cell_getIsGrouped(column, row)

    cell.getIsPlaceholder = () => cell_getIsPlaceholder(cell, column)

    cell.getIsAggregated = () => cell_getIsAggregated(cell, row)
  },
}