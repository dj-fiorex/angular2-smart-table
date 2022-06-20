import { Cell } from "./data-set/cell";

/**
 * @deprecated just use 'single' or 'multi'
 */
export enum SelectModeOptions {
  Single = "single",
  Multi = "multi"
}

export interface Settings {
  columns?: IColumns;
  resizable?: boolean;
  hideable?: boolean; // true = i can hide columns
  mode?: 'external' | 'inline';
  hideHeader?: boolean;
  hideSubHeader?: boolean;
  noDataMessage?: string;
  attr?: Attribute;
  actions?: Actions | false;
  edit?: EditAction;
  add?: AddAction;
  delete?: DeleteAction;
  filter?: any;
  expandedRowComponent?: any;
  expand?: Expand;
  pager?: Pager;
  rowClassFunction?: Function;
  selectMode?: 'single' | 'multi';
  selectedRowIndex?: number;
  switchPageToSelectedRowPage?: boolean;
}

export interface Filter {
  inputClass?: string;
}

export interface Expand {
  expandRowButtonContent?: string;
}

export interface IColumns {
  [key: string]: IColumn;
}

export enum IColumnType {
  Text = "text",
  Html = "html",
  Custom = "custom"
}

export type ISortDirection = 'asc' | 'desc';

export type ColumnValuePrepareFunction = (cellValue: any, row: any, cell: Cell) => any;
export type ColumnFilterFunction = (cellValue: any, searchString: string, rowData: any, cellName: string, row: any) => void;



export interface IColumn {
  title?: string;
  type?: IColumnType;
  class?: string;
  width?: string;
  sortDirection?: ISortDirection;
  defaultSortDirection?: string;
  editor?: { type: string, config?: any, component?: any };
  filter?: { type: string, config?: any, component?: any } | boolean;
  renderComponent?: any;
  compareFunction?: Function;
  valuePrepareFunction?: ColumnValuePrepareFunction;
  filterFunction?: ColumnFilterFunction;
  onComponentInitFunction?: Function;

  placeholder?: string;
  hide?: boolean;
  isSortable?: boolean;
  isEditable?: boolean;
  isAddable?: boolean;
  isFilterable?: boolean;
}

export interface Attribute {
  id?: string;
  class?: string;
}

export interface Actions {
  columnTitle?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  position?: 'left' | 'right';
  custom?: CustomAction[];
}

export interface AddAction {
  inputClass?: string;
  addButtonContent?: string;
  createButtonContent?: string;
  cancelButtonContent?: string;
  confirmCreate?: boolean;
}

export interface EditAction {
  inputClass?: string;
  editButtonContent?: string;
  saveButtonContent?: string;
  cancelButtonContent?: string;
  confirmSave?: boolean;
}

export interface DeleteAction {
  deleteButtonContent?: string;
  confirmDelete?: boolean;
}

export interface Pager {
  page?: number;
  display?: boolean;
  perPage?: number;
}

export interface CustomAction {
  name: string;
  title: string;
}
