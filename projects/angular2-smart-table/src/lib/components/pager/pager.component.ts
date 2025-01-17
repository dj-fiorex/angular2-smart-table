import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';

import {DataSource} from '../../lib/data-source/data-source';

@Component({
    selector: 'angular2-smart-table-pager',
    styleUrls: ['./pager.component.scss'],
    template: `
    <nav *ngIf="shouldShow()" class="angular2-smart-pagination-nav">
      <ul class="angular2-smart-pagination pagination">
        <li class="angular2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="getPage() == 1 ? false : paginate(1)" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">First</span>
          </a>
        </li>
        <li class="angular2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="angular2-smart-page-link page-link page-link-prev" href="#"
             (click)="getPage() == 1 ? false : prev()" aria-label="Prev">
            <span aria-hidden="true">&lt;</span>
            <span class="sr-only">Prev</span>
          </a>
        </li>
        <li class="angular2-smart-page-item page-item"
        [ngClass]="{active: getPage() == page}" *ngFor="let page of getPages()">
          <span class="angular2-smart-page-link page-link"
          *ngIf="getPage() == page">{{ page }} <span class="sr-only">(current)</span></span>
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="paginate(page)" *ngIf="getPage() != page">{{ page }}</a>
        </li>

        <li class="angular2-smart-page-item page-item"
            [ngClass]="{disabled: getPage() == getLast()}">
          <a class="angular2-smart-page-link page-link page-link-next" href="#"
             (click)="getPage() == getLast() ? false : next()" aria-label="Next">
            <span aria-hidden="true">&gt;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>

        <li class="angular2-smart-page-item page-item"
        [ngClass]="{disabled: getPage() == getLast()}">
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="getPage() == getLast() ? false : paginate(getLast())" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Last</span>
          </a>
        </li>
      </ul>
    </nav>
    <div *ngIf="!shouldShow()"><!-- placeholder to consume the space of the page selection --></div>

    <nav *ngIf="perPageSelect && perPageSelect.length > 0" class="angular2-smart-pagination-per-page">
      <label for="per-page" *ngIf="perPageSelectLabel">{{perPageSelectLabel}}</label>
      <select (change)="onChangePerPage($any($event.target).value)" [value]="perPage" id="per-page">
        <option *ngFor="let item of perPageSelect" [value]="item">{{ item }}</option>
      </select>
    </nav>
  `,
    standalone: false
})
export class PagerComponent implements OnChanges, OnDestroy {

  @Input() source!: DataSource;
  @Input() perPageSelect!: number[];
  @Input() perPageSelectLabel!: string;

  protected pages!: Array<any>;
  protected page!: number;
  protected count: number = 0;
  protected perPage!: number;

  protected dataChangedSub: Subscription | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      if (this.dataChangedSub !== null) {
        this.dataChangedSub.unsubscribe();
      }
      this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
        this.page = this.source.getPaging().page;
        this.perPage = this.source.getPaging().perPage;
        this.count = this.source.count();
        const lastPage = this.getLast();
        if (dataChanges.action === 'prepend') {
          this.source.setPage(1);
        } else if (dataChanges.action === 'append') {
          this.source.setPage(lastPage);
        } else if (this.page > lastPage) {
          this.source.setPage(lastPage);
        } else if (this.page < 1) {
          // for whatever reason...
          this.source.setPage(1);
        } else {
          // do not execute the following function when we needed to adjust the page!
          // another event will be emitted and as a reaction we will end up here again
          // (in previous versions, this code was executed unnecessarily often)
          this.initPages();
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

  shouldShow(): boolean {
    return this.source.count() > this.perPage;
  }

  paginate(page: number): boolean {
    this.source.setPage(page);
    this.page = page;
    return false;
  }

  next(): boolean {
    return this.paginate(this.getPage() + 1);
  }

  prev(): boolean {
    return this.paginate(this.getPage() - 1);
  }

  getPage(): number {
    return this.page;
  }

  getPages(): Array<any> {
    return this.pages;
  }

  getLast(): number {
    const last = Math.ceil(this.count / this.perPage);
    return last === 0 ? 1 : last;
  }

  initPages() {
    const pagesCount = this.getLast();
    let showPagesCount = 4;
    showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
    this.pages = [];

    if (this.shouldShow()) {

      let middleOne = Math.ceil(showPagesCount / 2);
      middleOne = this.page >= middleOne ? this.page : middleOne;

      let lastOne = middleOne + Math.floor(showPagesCount / 2);
      lastOne = lastOne >= pagesCount ? pagesCount : lastOne;

      const firstOne = lastOne - showPagesCount + 1;

      for (let i = firstOne; i <= lastOne; i++) {
        this.pages.push(i);
      }
    }
  }

  onChangePerPage(newPerPage: number) {
    this.source.getPaging().perPage = newPerPage;
    this.source.refresh();
    this.initPages();
  }

}
