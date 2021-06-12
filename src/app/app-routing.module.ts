import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartnerListComponent} from './modules/partner/components/partner-list/partner-list.component';
import {DummyComponent} from './modules/partner/components/dummy/dummy.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'partners',
  pathMatch: 'full'
}, {
  path: 'partners',
  component: PartnerListComponent
}, {
  path: 'dummy',
  component: DummyComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
