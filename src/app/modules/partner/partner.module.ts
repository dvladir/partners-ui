import { NgModule } from '@angular/core';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { PartnerEditorComponent } from './components/partner-editor/partner-editor.component';
import {BaseModule} from '../base/base.module';
import { PartnerListActionComponent } from './components/partner-list-action/partner-list-action.component';

@NgModule({
  declarations: [
    PartnerListComponent,
    DummyComponent,
    PartnerEditorComponent,
    PartnerListActionComponent
  ],
  imports: [
    BaseModule
  ],
  exports: [
    PartnerListComponent,
    DummyComponent
  ]
})
export class PartnerModule { }
