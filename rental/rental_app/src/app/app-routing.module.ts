import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageTenantComponent} from './manage-tenant/manage-tenant.component';
import {HomeComponent} from './home/home.component';
import {TenantFormComponent} from './manage-tenant/tenant-form/tenant-form.component';
import {TenantDetailsComponent} from './manage-tenant/tenant-details/tenant-details.component';
import {LoginComponent} from './_components/login/login.component';

import {SignUpComponent} from './_components/login/sign-up/sign-up.component';
import {NotFoundComponent} from './_components/not-found/not-found.component';
import {InProgressComponent} from './_components/in-progress/in-progress.component';
import {AddressDetailsComponent} from './manage-tenant/tenant-details/address-details/address-details.component';
import {MainTenantDetailsComponent} from './manage-tenant/tenant-details/main-tenant-details/main-tenant-details.component';
import { ContractDetailsComponent } from './manage-tenant/tenant-details/contract-details/contract-details.component';

const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'login' }, { path: 'login',
    // component: LoginComponent }, { path: 'sign-up', component: SignUpComponent },
    {
        path: 'tenant',
        component: ManageTenantComponent
    }, {
        path: '',
        component: HomeComponent
    }, {
        path: 'tenantForm',
        component: TenantFormComponent
    }, {
        path: 'tenantDetails',
        component: TenantDetailsComponent,
        children: [
            {
                path: 'addressDetails/:tenantId',
                component: AddressDetailsComponent
            }, {
                path: 'mainTenantDetails/:tenantId',
                component: MainTenantDetailsComponent
            },
            {
                path: 'contractDetails/:tenantId',
                component: ContractDetailsComponent
            }
        ]
    }, {
        path: 'inprogress',
        component: InProgressComponent
    }, {
        path: '**',
        component: NotFoundComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}