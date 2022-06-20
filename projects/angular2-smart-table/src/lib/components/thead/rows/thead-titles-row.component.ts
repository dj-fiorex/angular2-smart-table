import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

import {Grid} from '../../../lib/grid';
import {DataSource} from '../../../lib/data-source/data-source';
import {Column} from "../../../lib/data-set/column";

@Component({
  selector: '[angular2-st-thead-titles-row]',
  template: `
    <th angular2-st-checkbox-select-all
        *ngIf="isMultiSelectVisible"
        [style.width]="multiSelectWidth"
        [grid]="grid"
        [source]="source"
        [isAllSelected]="isAllSelected"
        (click)="selectAllRows.emit($event)"
    ></th>
    <th angular2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="angular2-smart-th {{ column.id }}"
        [ngClass]="column.class ?? ''"
        [style.width]="column.width"
    >
      <angular2-st-column-title
        [source]="source"
        [column]="column"
        [isHideable]="isHideable"
        (sort)="sort.emit($event)"
        (hide)="hide.emit($event)"
      ></angular2-st-column-title>
      <div *ngIf="isResizable" angular2-resizer class="angular2-resizer-block"></div>
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `,
})
export class TheadTitlesRowComponent implements OnChanges {

  @Input() grid!: Grid;
  @Input() isAllSelected!: boolean;
  @Input() source!: DataSource;

  @Output() sort = new EventEmitter<any>();
  @Output() hide = new EventEmitter<any>();
  @Output() selectAllRows = new EventEmitter<any>();

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
    this.isResizable = this.grid.getSetting('resizable');
    this.isHideable = this.grid.getSetting('hideable');
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }
}
