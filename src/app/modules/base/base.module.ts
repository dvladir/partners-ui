import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleOutletComponent} from './components/simple-outlet/simple-outlet.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TranslatePrepareModule} from '../translate-prepare/translate-prepare.module';
import {CoreModule} from '@dvladir/ng-ui-kit';
import { TnsSwitchComponent } from './components/tns-switch/tns-switch.component';


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
  declarations: [SimpleOutletComponent, TnsSwitchComponent],
  exports: [
    CommonModule,
    SimpleOutletComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslatePrepareModule,
    CoreModule,
    TnsSwitchComponent
  ]
})
export class BaseModule {
}
