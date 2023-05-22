import {Cell} from "./data-set/cell";
import {Row} from "./data-set/row";

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
  filter?: Filter;
  /**
   * @deprecated use `expand.component`
   */
  expandedRowComponent?: any;
  expand?: Expand;
  pager?: Pager;
  rowClassFunction?: Function;
  selectMode?: 'single' | 'multi' | 'multi_filtered';
  selectedRowIndex?: number;
  switchPageToSelectedRowPage?: boolean;
}

export interface Filter {
  inputClass?: string;
}

export interface Expand {
  /**
   * The content of the expand button.
   * @deprecated use buttonContent property
   */
  expandRowButtonContent?: string;
  /**
   * The angular component that shall be rendered when the row is expanded.
   * The data of the row is assigned to a property rowData.
   */
  component?: any;
  /**
   * The content of the expand button.
   * This can be HTML or even SVG - see the sanitizer property.
   */
  buttonContent?: string;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  /**
   * Configures the sanitizer to allow HTML or SVG content in the button.
   */
  sanitizer?: SanitizerSettings;
}

export interface IColumns {
  [key: string]: IColumn;
}

export enum IColumnType {
  Text = "text",
  Html = "html",
  Custom = "custom"
}

export type ISortDirection = 'asc' | 'desc' | null; // null means: do not sort

export type ColumnValuePrepareFunction = (cellValue: any, rowData: any, cell: Cell) => any;
export type ColumnFilterFunction = (cellValue: any, searchString: string, allData: any, cellName: string, rowData: any) => boolean;

export interface SanitizerSettings {
  /**
   * Set this to true to bypass the sanitizer for HTML content.
   * Security note: do not use this, if the content can be controlled by the user!
   */
  bypassHtml?: boolean;
}

export interface IColumn {
  title?: string;
  type?: IColumnType;
  sanitizer?: SanitizerSettings;
  classHeader?: string;
  classContent?: string;
  class?: string;
  width?: string;
  sortDirection?: ISortDirection;
  defaultSortDirection?: ISortDirection;
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
  sanitizer?: SanitizerSettings;
  hiddenWhen?: () => boolean;
  disabledWhen?: () => boolean;
  addButtonContent?: string;
  createButtonContent?: string;
  cancelButtonContent?: string;
  confirmCreate?: boolean;
}

export interface EditAction {
  inputClass?: string;
  sanitizer?: SanitizerSettings;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  editButtonContent?: string;
  saveButtonContent?: string;
  cancelButtonContent?: string;
  confirmSave?: boolean;
}

export interface DeleteAction {
  sanitizer?: SanitizerSettings;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  deleteButtonContent?: string;
  confirmDelete?: boolean;
}

export interface Pager {
  page?: number;
  display?: boolean;
  perPage?: number;
  perPageSelect?: number[];
  perPageSelectLabel?: string;
}

export interface CustomAction {
  name: string;
  /**
   * Historical name of the customButtonContent attribute.
   * @deprecated will be removed in 3.0.0
   */
  title?: string;
  customButtonContent?: string;
  sanitizer?: SanitizerSettings;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  renderComponent?: any;
}
