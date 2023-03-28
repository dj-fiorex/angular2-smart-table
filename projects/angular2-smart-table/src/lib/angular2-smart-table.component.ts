import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, ViewChild} from '@angular/core';
import {mergeMap, Subject, Subscription, tap} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DataSet} from './lib/data-set/data-set';
import {Row} from './lib/data-set/row';
import {DataSource, DataSourceChangeEvent} from './lib/data-source/data-source';
import {LocalDataSource} from './lib/data-source/local/local.data-source';
import {Grid} from './lib/grid';
import {deepExtend, getPageForRowIndex} from './lib/helpers';
import {IColumn, Settings, VirtualScroll} from './lib/settings';
import {
  CreateCancelEvent,
  CreateConfirmEvent,
  CreateEvent,
  CustomActionEvent,
  DeleteConfirmEvent,
  DeleteEvent,
  EditCancelEvent,
  EditConfirmEvent,
  EditEvent,
  RowSelectionEvent,
} from './lib/events';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'angular2-smart-table',
  styleUrls: ['./angular2-smart-table.component.scss'],
  templateUrl: './angular2-smart-table.component.html',
})
export class Angular2SmartTableComponent implements OnChanges, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) virtualScrollViewport?: CdkVirtualScrollViewport;

  @Input() source: any;
  @Input() settings: Settings = {};

  @Output() rowSelect = new EventEmitter<RowSelectionEvent>();
  @Output() userRowSelect = new EventEmitter<RowSelectionEvent>();
  @Output() delete = new EventEmitter<DeleteEvent>();
  @Output() edit = new EventEmitter<EditEvent>();
  @Output() create = new EventEmitter<CreateEvent>();
  @Output() custom = new EventEmitter<CustomActionEvent>();
  @Output() deleteConfirm = new EventEmitter<DeleteConfirmEvent>();
  @Output() editConfirm = new EventEmitter<EditConfirmEvent>();
  @Output() editCancel = new EventEmitter<EditCancelEvent>();
  @Output() createConfirm = new EventEmitter<CreateConfirmEvent>();
  @Output() createCancel = new EventEmitter<CreateCancelEvent>();
  @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterGridInit: EventEmitter<DataSet> = new EventEmitter<DataSet>();

  dataChangeSubscription?: Subscription;

  tableClass!: string;
  tableId!: string;
  perPageSelect: number[] = [];
  perPageSelectLabel: string = 'Per Page:';
  isHideHeader!: boolean;
  isHideSubHeader!: boolean;
  isPagerDisplay!: boolean;
  virtualScroll: VirtualScroll | undefined;
  virtualScrollEnabled: boolean = false;
  rowClassFunction!: Function;

  grid!: Grid;
  defaultSettings: Settings = {
    mode: 'inline', // inline|external
    selectMode: 'single', // single|multi|multi_filtered
    /**
     * Points to an element in all data
     *
     * when < 0 all lines must be deselected
     */
    selectedRowIndex: 0,
    switchPageToSelectedRowPage: false,
    hideHeader: false,
    hideSubHeader: false,
    resizable: false,
    hideable: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left', // left|right
    },
    filter: {
      inputClass: '',
    },
    edit: {
      inputClass: '',
      editButtonContent: 'Edit',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false,
    },
    add: {
      inputClass: '',
      addButtonContent: 'Add New',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: false,
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: false,
    },
    expand: {
      buttonContent: 'Expand'
    },
    attr: {
      id: '',
      class: '',
    },
    noDataMessage: 'No data found',
    columns: {},
    pager: {
      display: true,
      page: 1,
      perPage: 10,
    },
    rowClassFunction: () => '',
  };

  isAllSelected: boolean = false;

  private onSelectRowSubscription!: Subscription;
  private onDeselectRowSubscription!: Subscription;
  private onOffsetSubscription?: Subscription;
  private isOffsetEnd: boolean = false;
  private isOffsetLocked: boolean = false;
  private offset$ = new Subject<number>();
  private destroyed$: Subject<void> = new Subject<void>();

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.grid) {
      if (changes['settings']) {
        this.grid.setSettings(this.prepareSettings());
      }
      if (changes['source']) {
        this.source = this.prepareSource();
        this.grid.setSource(this.source);
      }
    } else {
      this.initGrid();
    }
    this.tableId = this.grid.getSetting('attr.id');
    this.tableClass = this.grid.getSetting('attr.class');
    this.isHideHeader = this.grid.getSetting('hideHeader');
    this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
    this.isPagerDisplay = this.grid.getSetting('pager.display');
    this.perPageSelect = this.grid.getSetting('pager.perPageSelect', this.perPageSelect);
    this.perPageSelectLabel = this.grid.getSetting('pager.perPageSelectLabel', this.perPageSelectLabel);
    this.virtualScroll = this.grid.getSetting('virtualScroll');
    this.virtualScrollEnabled = !!(this.virtualScroll && this.virtualScroll.itemSize && this.virtualScroll.viewportHeight);
    this.rowClassFunction = this.grid.getSetting('rowClassFunction');
    this.subscribeToOffset();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  selectRow(index: number, switchPageToSelectedRowPage: boolean = this.grid.getSetting('switchPageToSelectedRowPage')): void {
    if (!this.grid) {
      return;
    }
    this.grid.settings.selectedRowIndex = index;
    if (this.isIndexOutOfRange(index)) {
      // we need to deselect all rows if we got an incorrect index
      this.grid.dataSet.deselectAll();
      this.emitSelectRow(null);
      return;
    }

    if (switchPageToSelectedRowPage) {
      const source: DataSource = this.source;
      const paging: { page: number, perPage: number } = source.getPaging();
      const page: number = getPageForRowIndex(index, paging.perPage);
      index = index % paging.perPage;
      this.grid.settings.selectedRowIndex = index;

      if (page !== paging.page) {
        source.setPage(page);
        return;
      }

    }

    const row: Row = this.grid.getRows()[index];
    if (row) {
      this.grid.selectRow(row);
      this.emitSelectRow(row);
    }
  }

  onEditRowSelect(row: Row) {
    if (this.grid.getSetting('selectMode') === 'single') {
      this.grid.selectRow(row);
      this.emitSelectRow(row);
    }
  }

  onUserSelectRow(row: Row) {
    if (this.grid.getSetting('selectMode') === 'single') {
      this.grid.selectRow(row);
      this.emitUserSelectRow(row);
    }
  }

  onRowHover(row: Row) {
    this.rowHover.emit(row);
  }

  onMultipleSelectRow(row: Row) {
    this.grid.multipleSelectRow(row);
    // TODO: currently we make our life easy and just deselect the "select all" checkbox when needed
    //       but we do not check it, when we determine that the user has selected everything
    if (!row.isSelected) this.isAllSelected = false;
    this.emitUserSelectRow(row);
  }

  async onSelectAllRows() {
    this.isAllSelected = !this.isAllSelected;
    await this.grid.selectAllRows(this.isAllSelected);
    this.emitUserSelectRow(null);
  }

  onExpandRow(row: Row) {
    this.grid.expandRow(row);
  }

  initGrid() {
    this.source = this.prepareSource();
    this.grid = new Grid(this.source, this.prepareSettings());

    this.subscribeToOnSelectRow();
    /** Delay a bit the grid init event trigger to prevent empty rows */
    setTimeout(() => {
      this.afterGridInit.emit(this.grid.dataSet);
    }, 10);

  }

  prepareSource(): DataSource {
    let source: DataSource;
    if (this.source instanceof DataSource) {
      source = this.source;
    } else if (this.source instanceof Array) {
      source = new LocalDataSource(this.source);
    } else {
      source = new LocalDataSource();
    }

    // we have to hook up a listener to update some variables when the data source changes
    if (this.dataChangeSubscription) this.dataChangeSubscription.unsubscribe();
    this.dataChangeSubscription = source.onChanged().subscribe((changes: any) => this.processDataChange(changes));

    return source;
  }

  processDataChange(changes: DataSourceChangeEvent): void {
    // here we can already assume that the source has been lifted to an instance of DataSource
    const source = this.source as DataSource;
    this.isAllSelected = source.isEveryElementSelected(this.grid.getSetting('selectMode') === 'multi_filtered')
  }

  prepareSettings(): Settings {
    return deepExtend({}, this.defaultSettings, this.settings);
  }

  getNotVisibleColumns(): Array<IColumn> {
    return (this.grid?.getColumns() ?? []).filter((column: IColumn) => column.hide);
  }

  onShowHeader(columnId: string) {
    (this.settings as any).columns[columnId].hide = false;
    this.grid.setSettings(this.prepareSettings());
  }

  onHideHeader(columnId: string) {
    (this.settings as any).columns[columnId].hide = true;
    this.grid.setSettings(this.prepareSettings());
  }

  onVirtualScrollIndexChange(_index: number) {
    if (this.isOffsetEnd || this.isOffsetLocked || !this.virtualScrollViewport) return;

    const lastVisibleRowIndex: number = this.virtualScrollViewport.getRenderedRange().end;
    const totalRows: number = this.virtualScrollViewport.getDataLength();
    const threshold: number = this.virtualScroll?.infiniteScroll?.threshold ?? 0;

    if(totalRows === 0) return;
    console.log(`${(lastVisibleRowIndex + threshold)} >= ${totalRows}`);
    if ((lastVisibleRowIndex + threshold) >= totalRows) {
      this.offset$.next(totalRows);
    }
  }

  private createRowSelectionEvent(row: Row | null): RowSelectionEvent {
    return {
      row: row,
      data: row ? row.getData() : null,
      isSelected: row ? row.getIsSelected() : null,
      source: this.source,
      selected: this.grid.getSelectedItems(),
    };
  }

  private emitUserSelectRow(row: Row | null) {
    this.userRowSelect.emit(this.createRowSelectionEvent(row));
    // always also emit the general event
    this.emitSelectRow(row);
  }

  private emitSelectRow(row: Row | null) {
    this.rowSelect.emit(this.createRowSelectionEvent(row));
  }

  private isIndexOutOfRange(index: number): boolean {
    const dataAmount = this.source?.count();
    return index < 0 || (typeof dataAmount === 'number' && index >= dataAmount);
  }

  private subscribeToOnSelectRow(): void {
    if (this.onSelectRowSubscription) {
      this.onSelectRowSubscription.unsubscribe();
    }
    this.onSelectRowSubscription = this.grid.onSelectRow()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((row) => {
        this.emitSelectRow(row);
      });
  }

  private subscribeToOffset(): void {
    if (this.onOffsetSubscription) {
      this.onOffsetSubscription.unsubscribe();
    }

    if (!this.virtualScrollEnabled || !this.virtualScroll?.infiniteScroll?.getNextFunction) return;

    const getNextFunction = this.virtualScroll.infiniteScroll.getNextFunction;

    this.onOffsetSubscription = this.offset$.pipe(
      takeUntil(this.destroyed$),
      tap((_: number) => this.isOffsetLocked = true),
      mergeMap((offset: number) => getNextFunction(offset)),
    ).subscribe({
      next: (data: any[]) => {
        console.log('data', data);
        data.forEach((item: any) => this.source.append(item));
        this.isOffsetEnd = !data?.length;
        this.isOffsetLocked = false;
      },
      error: (_error: any) => {
        this.isOffsetLocked = false;
      },
    });
  }
}
