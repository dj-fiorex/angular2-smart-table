import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from 'rxjs';

import {Column} from '../../../lib/data-set/column';

@Component({
    template: '',
    standalone: false
})
export class DefaultFilter implements Filter, OnDestroy {

  changesSubscription!: Subscription;
  changesSubscription2!: Subscription;
  @Input() query: string = '';
  @Input() inputClass!: string;
  @Input() debounceTime: number = 300;
  @Input() column!: Column;
  @Output() filter = new EventEmitter<string>();

  ngOnDestroy() {
    if (this.changesSubscription) {
      this.changesSubscription.unsubscribe();
    }
    if (this.changesSubscription2) {
      this.changesSubscription2.unsubscribe();
    }
  }

  setFilter() {
    this.filter.emit(this.query);
  }
}

export interface Filter {

  debounceTime: number;
  changesSubscription?: Subscription;
  query: string;
  inputClass: string;
  column: Column;
  filter: EventEmitter<string>;
}
