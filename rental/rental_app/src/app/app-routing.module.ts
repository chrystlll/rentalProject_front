import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTenantComponent } from './manage-tenant/manage-tenant.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'tenant', component: ManageTenantComponent },
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
