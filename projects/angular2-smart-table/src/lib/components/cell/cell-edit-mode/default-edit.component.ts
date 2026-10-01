import {Component, ChangeDetectionStrategy} from '@angular/core';

import {EditCellDefault} from './edit-cell-default';

@Component({
    selector: 'table-cell-default-editor',
    templateUrl: './default-edit.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DefaultEditComponent extends EditCellDefault {

  constructor() {
    super();
  }

  getEditorType(): string {
    const editor = this.cell.getColumn().editor
    if (!editor) {
      return 'default';
    }
    return editor.type;
  }
}
