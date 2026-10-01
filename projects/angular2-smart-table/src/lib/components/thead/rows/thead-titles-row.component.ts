import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {Grid} from '../../../lib/grid';
import {DataSource} from '../../../lib/data-source/data-source';
import {Column} from "../../../lib/data-set/column";

@Component({
    selector: '[angular2-st-thead-titles-row]',
    template: `
    @if (isMultiSelectVisible) {
      <th [style.width]="multiSelectWidth" scope="col" >
        <input type="checkbox" [checked]="isAllSelected" (click)="selectAllRows.emit()">
      </th>
    }
    @if (showActionColumnLeft) {
      <th angular2-st-actions-title [grid]="grid" scope="col"></th>
    }
    @for (column of visibleColumns; track column; let i = $index; let isLast = $last) {
      <th
        class="angular2-smart-th {{ column.id }}"
        [ngClass]="column.classHeader"
        [style.width]="column.width"
        scope="col"
        >
        <angular2-st-column-title
          [source]="source"
          [column]="column"
          [isHideable]="isHideable"
          [multiSort]="grid.isMultiSortEnabled()"
          (hide)="hide.emit($event)"
        ></angular2-st-column-title>
        @if (isResizable && (showActionColumnRight || !isLast)) {
          <div
            [angular2SmartTableResizer]="{column: column, siblingColumn: isLast ? undefined : visibleColumns[i+1]}"
            class="angular2-resizer-block"
          ></div>
        }
      </th>
    }
    @if (showActionColumnRight) {
      <th angular2-st-actions-title [grid]="grid" scope="col"></th>
    }
    `,
    standalone: false
})
export class TheadTitlesRowComponent implements OnChanges {

  @Input() grid!: Grid;
  @Input() isAllSelected!: boolean;
  @Input() source!: DataSource;

  @Output() hide = new EventEmitter<string>();
  @Output() selectAllRows = new EventEmitter<void>();

  multiSelectWidth: string = '3rem';
  isMultiSelectVisible!: boolean;
  showActionColumnLeft!: boolean;
  showActionColumnRight!: boolean;
  isResizable!: boolean;
  isHideable: boolean = false;


  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.isResizable = this.grid.settings.resizable ?? false;
    this.isHideable = this.grid.settings.hideable ?? false;
  }

  get visibleColumns(): Array<Column> {
    return (this.grid.getColumns() || []).filter((column: Column) => !column.hide);
  }
}
