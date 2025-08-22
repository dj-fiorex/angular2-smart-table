import {Component} from '@angular/core';

import {DefaultEditor} from './default-editor';
import {ListEditorSettings} from "../../../lib/settings";

@Component({
    selector: 'select-editor',
    styleUrls: ['./editor.component.scss'],
    template: `
    <select [ngClass]="inputClass"
            (change)="onSelectionChanged($any($event.target).value)"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            (keydown.enter)="disableEnterKeySave || onEdited.emit()"
            (keydown.esc)="onStopEditing.emit()"
    >
        <option value="">{{ editorConfig.selectText ?? 'Select...' }}</option>
        <option *ngFor="let option of editorConfig.list" [value]="option.value"
                [selected]="option.value === cell.getRawValue()">{{ option.title }}
        </option>
    </select>
    `,
    standalone: false
})
export class SelectEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }

  get editorConfig(): ListEditorSettings {
    return this.cell.getColumn().getConfig();
  }

  onSelectionChanged(newValue: string) {
    this.cell.setValue(newValue);
  }
}
