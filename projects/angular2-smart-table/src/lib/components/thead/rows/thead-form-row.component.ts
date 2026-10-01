import {Component, EventEmitter, Input, OnChanges, ChangeDetectionStrategy} from '@angular/core';

import {Grid} from '../../../lib/grid';
import {Row} from '../../../lib/data-set/row';
import {Cell} from '../../../lib/data-set/cell';
import {CreateCancelEvent, CreateConfirmEvent} from '../../../lib/events';

@Component({
    selector: '[angular2-st-thead-form-row]',
    template: `
    @if (isMultiSelectVisible) {
      <td></td>
    }
    @if (showActionColumnLeft) {
      <td class="angular2-smart-actions">
        <angular2-st-thead-create-cancel [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-thead-create-cancel>
      </td>
    }
    @for (cell of getVisibleCells(row.getCells()); track cell) {
      <td>
        <angular2-smart-table-cell
          [cell]="cell"
          [grid]="grid"
          [isNew]="true"
          [createConfirm]="createConfirm"
          [createCancel]="createCancel"
          [inputClass]="addInputClass"
          [isInEditing]="true"
        ></angular2-smart-table-cell>
      </td>
    }
    @if (showActionColumnRight) {
      <td class="angular2-smart-actions">
        <angular2-st-thead-create-cancel [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-thead-create-cancel>
      </td>
    }
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TheadFormRowComponent implements OnChanges {

  @Input() grid!: Grid;
  @Input() row!: Row;
  @Input() createConfirm!: EventEmitter<CreateConfirmEvent>;
  @Input() createCancel!: EventEmitter<CreateCancelEvent>;
  isMultiSelectVisible!: boolean;

  showActionColumnLeft!: boolean;
  showActionColumnRight!: boolean;
  addInputClass!: string;

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.addInputClass = this.grid.settings.add?.inputClass ?? '';
  }

  getVisibleCells(cells: Array<Cell>): Array<Cell> {
    return (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
  }
}
