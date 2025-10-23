import {Component} from '@angular/core';

import {FilterDefault} from "./filter-default";

@Component({
    selector: 'default-table-filter',
    template: `
    <ng-container [ngSwitch]="column.filter.type">
      <select-filter *ngSwitchCase="'list'"
                     [query]="query"
                     [inputClass]="inputClass"
                     [debounceTime]="debounceTime"
                     [column]="column"
                     (filter)="onFilter($event)">
      </select-filter>
      <multiselect-filter *ngSwitchCase="'multiselect'"
                          [query]="query"
                          [inputClass]="inputClass"
                          [debounceTime]="debounceTime"
                          [column]="column"
                          (filter)="onFilter($event)">
      </multiselect-filter>
      <checkbox-filter *ngSwitchCase="'checkbox'"
                       [query]="query"
                       [inputClass]="inputClass"
                       [debounceTime]="debounceTime"
                       [column]="column"
                       (filter)="onFilter($event)">
      </checkbox-filter>
      <input-filter *ngSwitchDefault
                    [query]="query"
                    [inputClass]="inputClass"
                    [debounceTime]="debounceTime"
                    [column]="column"
                    (filter)="onFilter($event)">
      </input-filter>
    </ng-container>
  `,
    standalone: false
})
export class DefaultFilterComponent extends FilterDefault {
}
