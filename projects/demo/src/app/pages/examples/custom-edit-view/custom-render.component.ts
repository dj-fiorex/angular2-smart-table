import {Component, ChangeDetectionStrategy} from '@angular/core';

import {Cell} from 'angular2-smart-table';

@Component({
    template: `
    {{renderValue}}
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CustomRenderComponent {

  renderValue: string = '';

  static componentInit(instance: CustomRenderComponent, cell: Cell) {
    instance.renderValue = cell.getValue().toUpperCase();
  }
}
