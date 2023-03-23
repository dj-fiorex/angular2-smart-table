import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

import {Grid} from '../../lib/grid';
import {DataSource} from '../../lib/data-source/data-source';
import {Cell} from '../../lib/data-set/cell';
import {delay} from 'rxjs/operators';
import {Row} from '../../lib/data-set/row';
import {
  CustomActionEvent,
  DeleteConfirmEvent,
  DeleteEvent,
  EditCancelEvent,
  EditConfirmEvent,
  EditEvent
} from '../../lib/events';

@Component({
  selector: '[angular2-st-tbody]',
  styleUrls: ['./tbody.component.scss'],
  templateUrl: './tbody.component.html',
})
export class NgxSmartTableTbodyComponent implements AfterViewInit, OnDestroy {

  @Input() grid!: Grid;
  @Input() source!: DataSource;
  @Input() virtualScrollEnabled!: boolean;
  @Input() deleteConfirm!: EventEmitter<DeleteConfirmEvent>;
  @Input() editConfirm!: EventEmitter<EditConfirmEvent>;
  @Input() editCancel!: EventEmitter<EditCancelEvent>;
  @Input() rowClassFunction!: Function;

  @Output() edit = new EventEmitter<EditEvent>();
  @Output() delete = new EventEmitter<DeleteEvent>();
  @Output() custom = new EventEmitter<CustomActionEvent>();

  @Output() userSelectRow = new EventEmitter<Row>();
  @Output() editRowSelect = new EventEmitter<Row>();
  @Output() multipleSelectRow = new EventEmitter<Row>();
  @Output() rowHover = new EventEmitter<Row>();
  @Output() onExpandRow = new EventEmitter<Row>();

  @ContentChild('virtualRowsTemplate', {static: true}) virtualRowsProjectedTemplate?: TemplateRef<any>

  @ViewChildren('expandedRowChild', { read: ViewContainerRef }) expandedRowChild!: QueryList<ViewContainerRef>;

  expandedRowComponent: any;
  hasChildComponent: boolean = false;

  ngAfterViewInit(): void {
    let cmp = this.getExpandedRowComponentFromSettings();
    if (cmp && !this.expandedRowComponent) {
      this.expandedRowChild.forEach(c => c.clear());
      this.hasChildComponent = true;
      this.createCustomComponent();
    }
  }

  ngOnDestroy(): void {
    if (this.expandedRowComponent) this.expandedRowComponent.destroy();
  }

  private getExpandedRowComponentFromSettings(): any {
    return this.grid.settings.expand?.component ?? this.grid.settings.expandedRowComponent;
  }

  protected createCustomComponent() {
    let cmp = this.getExpandedRowComponentFromSettings();
    if (cmp) {
      this.expandedRowChild.changes
        .pipe(delay(0))
        .subscribe((list: QueryList<ViewContainerRef>) => {
          if (list.length) {
            this.expandedRowComponent = list.first.createComponent(cmp);
            Object.assign(this.expandedRowComponent.instance, this.grid.dataSet.expandRow, {
              rowData: this.grid.dataSet.getExpandedRow().getData(),
            });
          }
        });
    }
  }

  isMultiSelectVisible!: boolean;
  showActionColumnLeft!: boolean;
  showActionColumnRight!: boolean;
  mode!: string;
  editInputClass!: string;
  isActionAdd!: boolean;
  isActionEdit!: boolean;
  isActionDelete!: boolean;
  noDataMessage!: boolean;

  get tableColumnsCount() {
    const actionColumn = this.isActionAdd || this.isActionEdit || this.isActionDelete ? 1 : 0;
    const selectColumn = this.isMultiSelectVisible ? 1 : 0;
    return this.grid.getColumns().length + actionColumn + selectColumn;
  }

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.mode = this.grid.getSetting('mode');
    this.editInputClass = this.grid.getSetting('edit.inputClass');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.isActionAdd = this.grid.getSetting('actions.add');
    this.isActionEdit = this.grid.getSetting('actions.edit');
    this.isActionDelete = this.grid.getSetting('actions.delete');
    this.noDataMessage = this.grid.getSetting('noDataMessage');
  }

  getVisibleCells(cells: Array<Cell>): Array<Cell> {
    return (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
  }

  onExpandRowClick(row: Row) {
    this.onExpandRow.emit(row);
  }
}
