import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleOutletComponent} from './components/simple-outlet/simple-outlet.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TranslatePrepareModule} from '../translate-prepare/translate-prepare.module';
import {CoreModule} from '@dvladir/ng-ui-kit';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslatePrepareModule,
    CoreModule
  ],
  declarations: [SimpleOutletComponent],
  exports: [
    CommonModule,
    SimpleOutletComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslatePrepareModule,
    CoreModule
  ]
})
export class BaseModule {
}
