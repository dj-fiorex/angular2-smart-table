import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {DefaultFilter} from './default-filter';
import {debounceTime} from 'rxjs/operators';
import {CheckboxFilterSettings} from "../../../lib/settings";

@Component({
    selector: 'checkbox-filter',
    template: `
    <input type="checkbox" [formControl]="inputControl" [ngClass]="inputClass" class="form-control">
    <a href="#" *ngIf="filterActive" (click)="resetFilter($event)">{{resetText}}</a>
  `,
    standalone: false
})
export class CheckboxFilterComponent extends DefaultFilter implements OnInit {

  filterActive: boolean = false;
  inputControl = new FormControl();

  trueVal = 'true';
  falseVal = 'false';
  resetText = 'reset';

  constructor() {
    super();
  }

  ngOnInit() {
    if (typeof this.column.filter !== "boolean" && typeof this.column.filter.config !== "undefined") {
      const config = this.column.filter.config as CheckboxFilterSettings;
      this.trueVal = config?.true ?? 'true';
      this.falseVal = config?.false ?? 'false';
      this.resetText = config?.resetText ?? 'reset';
    }

    this.changesSubscription = this.inputControl.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe((checked: boolean) => {
        this.filterActive = true;
        this.query = checked ? this.trueVal : this.falseVal;
        this.setFilter();
      });
  }

  resetFilter(event: any) {
    event.preventDefault();
    this.query = '';
    this.inputControl.setValue(false, { emitEvent: false });
    this.filterActive = false;
    this.setFilter();
  }
}
