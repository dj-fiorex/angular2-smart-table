import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'examples',
    styleUrls: ['./examples.component.scss'],
    templateUrl: 'examples.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExamplesComponent {
}
