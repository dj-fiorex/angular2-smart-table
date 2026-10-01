import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {Grid} from '../../../lib/grid';
import {DataSource} from '../../../lib/data-source/data-source';
import {Column} from "../../../lib/data-set/column";
import {CreateEvent} from '../../../lib/events';

@Component({
    selector: '[angular2-st-thead-filters-row]',
    template: `
    @if (isMultiSelectVisible) {
      <th scope="col"></th>
    }
    @if (showActionColumnLeft) {
      <th angular2-st-add-button
        [grid]="grid"
        (create)="create.emit($event)"
        scope="col"
        >
      </th>
    }
    @for (column of getVisibleColumns(grid.getColumns()); track column) {
      <th class="angular2-smart-th {{ column.id }}" scope="col">
        <angular2-smart-table-filter
          [source]="source"
          [column]="column"
          [inputClass]="filterInputClass"
          [debounceTime]="filterDebounceTime"
        ></angular2-smart-table-filter>
      </th>
    }
    @if (showActionColumnRight) {
      <th angular2-st-add-button
        [grid]="grid"
        [source]="source"
        (create)="create.emit($event)"
        scope="col"
        >
      </th>
    }
    `,
    standalone: false
})
export class TheadFitlersRowComponent implements OnChanges {

  @Input() grid!: Grid;
  @Input() source!: DataSource;

  @Output() create = new EventEmitter<CreateEvent>();

  isMultiSelectVisible!: boolean;
  showActionColumnLeft!: boolean;
  showActionColumnRight!: boolean;
  filterInputClass!: string;
  filterDebounceTime: number = 300;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['grid'] !== undefined) {
      this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
      this.showActionColumnLeft = this.grid.showActionColumn('left');
      this.showActionColumnRight = this.grid.showActionColumn('right');
      this.filterInputClass = this.grid.settings.filter?.inputClass ?? '';
      this.filterDebounceTime = this.grid.settings.filter?.debounceTime ?? 300;
    }
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }
}
