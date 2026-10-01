import {Component, ChangeDetectionStrategy} from '@angular/core';

import {FilterDefault} from "./filter-default";

@Component({
    selector: 'default-table-filter',
    template: `
@switch (column.filter.type) {
  @case ('list') {
    <select-filter
      [query]="query"
      [inputClass]="inputClass"
      [debounceTime]="debounceTime"
      [column]="column"
      (filter)="onFilter($event)">
    </select-filter>
  }
  @case ('multiselect') {
    <multiselect-filter
      [query]="query"
      [inputClass]="inputClass"
      [debounceTime]="debounceTime"
      [column]="column"
      (filter)="onFilter($event)">
    </multiselect-filter>
  }
  @case ('checkbox') {
    <checkbox-filter
      [query]="query"
      [inputClass]="inputClass"
      [debounceTime]="debounceTime"
      [column]="column"
      (filter)="onFilter($event)">
    </checkbox-filter>
  }
  @default {
    <input-filter
      [query]="query"
      [inputClass]="inputClass"
      [debounceTime]="debounceTime"
      [column]="column"
      (filter)="onFilter($event)">
    </input-filter>
  }
}
`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DefaultFilterComponent extends FilterDefault {
}
