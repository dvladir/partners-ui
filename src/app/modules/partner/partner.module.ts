import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import {CoreModule} from '@vt/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DummyComponent } from './components/dummy/dummy.component';


@NgModule({
  declarations: [
    PartnerListComponent,
    DummyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports: [
    PartnerListComponent,
    DummyComponent
  ]
})
export class PartnerModule { }
