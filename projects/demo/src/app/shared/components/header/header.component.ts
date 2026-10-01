import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'header-component',
    styles: [`
    li::marker {
      content: '';
    }
    ul {
      padding: 0;
    }
  `],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HeaderComponent {

  @Input() tagline: string = '';

}
