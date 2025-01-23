import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';

import {Column} from '../../../lib/data-set/column';
import {DataSource, ISortConfig} from '../../../lib/data-source/data-source';
import {Subscription} from "rxjs";

@Component({
  selector: 'angular2-st-column-title',
  styles: `
    a.sort {
      &::after {
        display: inline-block;
        font-size: .8em;
        color: darkgrey;
        vertical-align: top;
      }

      &.asc::after {
        content: "▲";
      }

      &.desc::after {
        content: "▼";
      }
    }
  `,
  template: `
    <a href="#" *ngIf="column.isSortable"
       (click)="_sort($event)"
       class="angular2-smart-sort-link sort"
       [ngClass]="currentDirection??''">
      {{ column.title }}
    </a>
    <span class="angular2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
    <button style="position: absolute; top:0; right:0; border:none" *ngIf="isHideable"
            (click)="_hideColumnClicked($event)">🗙
    </button>
  `,
  standalone: false
})
export class ColumnTitleComponent implements OnChanges, OnDestroy {

  currentDirection: 'asc' | 'desc' | null = null;
  @Input() multiSort = true;
  @Input() column!: Column;
  @Input() source!: DataSource;
  @Input() isHideable!: boolean;
  @Output() hide = new EventEmitter<string>();

  protected dataChangedSub: Subscription | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      if (this.dataChangedSub !== null) {
        this.dataChangedSub.unsubscribe();
      }
      this.dataChangedSub = this.source.onChanged().subscribe(_ => {
        this.currentDirection = null;
        const sortConf = this.source.getSort();
        if (sortConf) {
          sortConf.forEach(c => {
            if (c.field === this.column.id) {
              this.currentDirection = c.direction;
            }
          });
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.dataChangedSub !== null) {
      this.dataChangedSub.unsubscribe();
      this.dataChangedSub = null;
    }
  }

  _sort(event: any) {
    event.preventDefault();
    this.changeSortDirection();
    const conf: ISortConfig = {
      field: this.column.id,
      direction: this.currentDirection,
      compare: this.column.compareFunction,
    };
    if (this.multiSort) {
      this.source.updateSort([conf]);
    } else {
      this.source.setSort([conf]);
    }
  }


  _hideColumnClicked(event: any) {
    event.preventDefault();
    this.hide.emit(this.column.id);
  }


  private changeSortDirection(): void {
    // rotate sort direction, including null (no sort)
    if (this.currentDirection === null) {
      this.currentDirection = 'asc';
    } else if (this.currentDirection === 'asc') {
      this.currentDirection = 'desc';
    } else if (this.currentDirection === 'desc') {
      this.currentDirection = null;
    }
  }
}
