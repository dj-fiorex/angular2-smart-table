import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Cell} from '../../../lib/data-set/cell';
import {SecurityTrustType} from '../../../pipes/bypass-security-trust.pipe';

@Component({
    selector: 'table-cell-view-mode',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>
      @switch (cell.getColumn().type) {
        @case ('custom') {
          <custom-view-component [cell]="cell"></custom-view-component>
        }
        @case ('html') {
          <div [innerHTML]="cell.getValue() | bypassSecurityTrust: bypassSecurityTrust" [ngClass]="cssClass"></div>
        }
        @default {
          <div [ngClass]="cssClass">{{ cell.getValue() }}</div>
        }
      }
    </div>
    `,
    standalone: false
})
export class ViewCellComponent {

  @Input() cell!: Cell;

  get bypassSecurityTrust(): SecurityTrustType {
    return this.cell.getColumn().sanitizer.bypassHtml ? 'html' : 'none';
  }

  get cssClass(): string {
    return this.cell.getColumn().classContent;
  }
}
