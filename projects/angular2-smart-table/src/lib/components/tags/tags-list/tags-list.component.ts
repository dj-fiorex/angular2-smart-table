import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {TagsListEntry} from "../tag/tag.component";

@Component({
    selector: 'angular2-smart-table-tags-list',
    templateUrl: './tags-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TagsListComponent {

    @Input() tags!: TagsListEntry[];

    @Output() close = new EventEmitter<string>();

    closedTag(tagKey: string) {
        this.close.emit(tagKey);
    }
}
