import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {Grid} from '../../../lib/grid';
import {DataSource} from '../../../lib/data-source/data-source';
import {Column} from "../../../lib/data-set/column";
import {CreateEvent} from '../../../lib/events';

@Component({
  selector: '[angular2-st-thead-filters-row]',
  template: `
    <th *ngIf="isMultiSelectVisible" scope="col"></th>
    <th angular2-st-add-button
        *ngIf="showActionColumnLeft"
        [grid]="grid"
        (create)="create.emit($event)"
        scope="col"
    >
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="angular2-smart-th {{ column.id }}"
        scope="col"
    >
      <angular2-smart-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
      ></angular2-smart-table-filter>
    </th>
    <th angular2-st-add-button
        *ngIf="showActionColumnRight"
        [grid]="grid"
        [source]="source"
        (create)="create.emit($event)"
        scope="col"
    >
    </th>
  `,
})
export class TheadFitlersRowComponent implements OnChanges {

  @Input() grid!: Grid;
  @Input() source!: DataSource;

  @Output() create = new EventEmitter<CreateEvent>();

  isMultiSelectVisible!: boolean;
  showActionColumnLeft!: boolean;
  showActionColumnRight!: boolean;
  filterInputClass!: string;

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.filterInputClass = this.grid.settings.filter?.inputClass ?? '';
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }
}
