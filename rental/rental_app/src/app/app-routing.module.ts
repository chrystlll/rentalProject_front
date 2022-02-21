import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTenantComponent } from './manage-tenant/manage-tenant.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './manage-tenant/tenant-form/tenant-form.component';
import { TenantDetailsComponent } from './manage-tenant/tenant-details/tenant-details.component';
import { LoginComponent } from './_components/login/login.component';

import { SignUpComponent } from './_components/login/sign-up/sign-up.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';

const routes: Routes = [
 // { path: '', pathMatch: 'full', redirectTo: 'login' },
 // { path: 'login', component: LoginComponent },
 // { path: 'sign-up', component: SignUpComponent },
  { path: 'tenant', component: ManageTenantComponent },
  { path: '', component: HomeComponent },
  { path: 'tenantForm', component: TenantFormComponent },
  { path: 'tenantDetails/:tenantId', component: TenantDetailsComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
