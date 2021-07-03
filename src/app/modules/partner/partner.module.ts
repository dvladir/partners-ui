import { NgModule } from '@angular/core';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { PartnerEditorComponent } from './components/partner-editor/partner-editor.component';
import {BaseModule} from '../base/base.module';


@NgModule({
  declarations: [
    PartnerListComponent,
    DummyComponent,
    PartnerEditorComponent
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
