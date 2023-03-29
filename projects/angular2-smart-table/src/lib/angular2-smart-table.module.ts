import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Angular2SmartTableComponent} from './angular2-smart-table.component';
import {CellModule} from './components/cell/cell.module';
import {FilterModule} from './components/filter/filter.module';
import {PagerModule} from './components/pager/pager.module';
import {TabsModule} from './components/tags/tags.module';
import {TBodyModule} from './components/tbody/tbody.module';
import {THeadModule} from './components/thead/thead.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {PipesModule} from './pipes/pipes.module';


@NgModule({
  declarations: [
    Angular2SmartTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    FilterModule,
    PagerModule,
    TBodyModule,
    THeadModule,
    TabsModule,
    ScrollingModule,
    PipesModule
  ],
  exports: [
    Angular2SmartTableComponent
  ]
})
export class Angular2SmartTableModule { }
