import {NgModule} from '@angular/core';
import {BypassSecurityTrustPipe} from './bypass-security-trust.pipe';
import {NumberToArrayPipe} from './number-to-array.pipe';

const PIPES = [
  BypassSecurityTrustPipe,
  NumberToArrayPipe,
];

@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {

}
