import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';

export interface TagsListEntry {
  key: string;
  value: string;
}

@Component({
    selector: 'angular2-smart-table-tag',
    templateUrl: './tag.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TagComponent {

    @Input() item!: TagsListEntry;

    @Output() close = new EventEmitter<string>();

    closeClicked(evt: Event) {
        evt.stopPropagation();
        this.close.emit(this.item.key);
    }
}
