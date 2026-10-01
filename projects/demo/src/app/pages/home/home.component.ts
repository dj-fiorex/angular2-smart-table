import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent {

  constructor() {
  }

}
