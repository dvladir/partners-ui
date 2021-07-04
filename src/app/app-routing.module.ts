import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartnerListComponent} from './modules/partner/components/partner-list/partner-list.component';
import {DummyComponent} from './modules/partner/components/dummy/dummy.component';
import {SimpleOutletComponent} from './modules/base/components/simple-outlet/simple-outlet.component';
import {PartnerEditorComponent} from './modules/partner/components/partner-editor/partner-editor.component';
import {PartnerResolver} from './modules/partner/services/partner.resolver';
import {PartnerDeactivate} from './modules/partner/services/partner.deactivate';

const routes: Routes = [{
  path: '',
  redirectTo: 'partners',
  pathMatch: 'full'
}, {
  path: 'partners',
  component: SimpleOutletComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: PartnerListComponent
    },
    {
      path: 'edit/:id',
      resolve: {
        partner: PartnerResolver
      },
      canDeactivate: [
        PartnerDeactivate
      ],
      component: PartnerEditorComponent
    }
  ]
}, {
  path: 'dummy',
  component: DummyComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
