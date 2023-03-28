import {Cell} from "./data-set/cell";
import {Row} from "./data-set/row";
import {Observable} from 'rxjs';

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
  virtualScroll?: VirtualScroll;
  infiniteScroll?: InfiniteScroll;
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
  title: string;
  renderComponent?: any;
}

export interface VirtualScroll {
  /**
   * Height of the table viewport. Can be in pixels, percentage, vh, or even a calc().
   * Example: 'calc(100vh - 200px)'
   * Example: '400px'
   */
  viewportHeight: string;
  /**
   * The height of a table row in pixels.
   * Example: 35
   * More info: https://material.angular.io/cdk/scrolling/overview
   */
  itemSize: number;
  /**
   * To improve rendering performance, *cdkVirtualFor caches previously created views after they are no longer needed.
   * When a new view would normally be created, a cached view is reused instead.
   * The size of the view cache can be adjusted via the templateCacheSize property; setting this size to 0 disables caching.
   * If your templates are expensive in terms of memory you may wish to reduce this number to avoid spending too much memory on the template cache.
   * Example: 20
   * More info: https://material.angular.io/cdk/scrolling/overview
   */
  templateCacheSize?: number;
  /**
   * The minBufferPx is the minimum amount of content buffer (in pixels) that the viewport must render.
   * If the viewport ever detects that there is less buffered content it will immediately render more.
   * Example: 100
   * More info: https://material.angular.io/cdk/scrolling/overview
   */
  minBufferPx?: number;
  /**
   * The second buffer parameter is maxBufferPx.
   * This tells the viewport how much buffer space to render back up to when it detects that more buffer is required.
   * Example: 200
   * More info: https://material.angular.io/cdk/scrolling/overview
   */
  maxBufferPx?: number;
  infiniteScroll?: InfiniteScroll;
}

export interface InfiniteScroll {
  /**
   * Threshold after which the getNextFunction gets called.
   * Instead of waiting till the user scrolls to the bottom, proactively start loading the next data when the user is within the threshold.
   * Meaning if the threshold is set to 5 and the user is 5 rows away from the bottom, the next data will be loaded.
   * If the threshold is set to 0 (default), the next data will be loaded when the user is at the bottom.
   * Be careful with this setting, as it can cause a lot of requests to be sent to the server (if you don't know what you're doing).
   * Example: 5
   */
  threshold?: number;
  /**
   * Function that returns next page of data.
   * @param offset
   */
  getNextFunction?: (offset: number) => Observable<any[]>;

}
