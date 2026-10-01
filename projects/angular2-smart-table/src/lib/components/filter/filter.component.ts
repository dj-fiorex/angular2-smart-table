import {Component, OnChanges, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
import {FilterDefault} from './filter-default';
import {Subscription} from 'rxjs';

@Component({
    selector: 'angular2-smart-table-filter',
    styleUrls: ['./filter.component.scss'],
    template: `
      @if (column.isFilterable) {
        <div class="angular2-smart-filter">
          @switch (column.filter.type) {
            @case ('custom') {
              <custom-table-filter
                [query]="query"
                [column]="column"
                [source]="source"
                [inputClass]="inputClass"
                [debounceTime]="debounceTime"
              ></custom-table-filter>
            }
            @default {
              <default-table-filter
                [query]="query"
                [column]="column"
                [source]="source"
                [inputClass]="inputClass"
                [debounceTime]="debounceTime"
              ></default-table-filter>
            }
          }
        </div>
      }
      `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FilterComponent extends FilterDefault implements OnChanges {
  query: string = '';
  protected dataChangedSub!: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      if (!changes.source.firstChange) {
        this.dataChangedSub.unsubscribe();
      }
      this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
        let newQuery = '';
        for (const f of dataChanges.filter) {
          if (f.field == this.column.id) {
            newQuery = f.search;
            break;
          }
        }
        this.query = newQuery;
      });
    }
  }
}
