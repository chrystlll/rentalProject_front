import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTenantComponent } from './manage-tenant/manage-tenant.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './manage-tenant/tenant-form/tenant-form.component';

const routes: Routes = [
  { path: 'tenant', component: ManageTenantComponent },
  { path: '', component: HomeComponent },
  { path: 'tenantForm', component: TenantFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
