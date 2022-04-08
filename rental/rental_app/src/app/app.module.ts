import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageTenantComponent } from './manage-tenant/manage-tenant.component';
import { ManagePropertiesComponent } from './manage-properties/manage-properties.component';
import { HeaderComponent } from './_components/header/header.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './manage-tenant/tenant-add-tenant/tenant-form.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TenantDetailsComponent } from './manage-tenant/tenant-details/tenant-details.component';
import { LoginComponent } from './_components/login/login.component';
import { SignInComponent } from './_components/login/sign-in/sign-in.component';
import { SignUpComponent } from './_components/login/sign-up/sign-up.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { InProgressComponent } from './_components/in-progress/in-progress.component';
import { MainTenantDetailsComponent } from './manage-tenant/tenant-details/main-tenant-details/main-tenant-details.component';
import { ContractDetailsComponent } from './manage-tenant/tenant-details/contract-details/contract-details.component';
import { AddressDetailsComponent } from './manage-tenant/tenant-details/address-details/address-details.component';
import { TestComponent } from './_test/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule} from "primeng/autocomplete";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatSortModule} from '@angular/material/sort';
import { ManageContractComponent } from './manage-contract/manage-contract.component';
import { ContractDetComponent } from './manage-contract/contract-det/contract-det.component';
import { ContractInfoComponent } from './manage-contract/contract-det/contract-info/contract-info.component';
import { ContractPriceComponent } from './manage-contract/contract-det/contract-price/contract-price.component';
import { ContractPaymentComponent } from './manage-contract/contract-det/contract-payment/contract-payment.component';
import { ContractVehicleComponent } from './manage-contract/contract-det/contract-vehicle/contract-vehicle.component';
import { ContractPlaceComponent } from './manage-contract/contract-det/contract-place/contract-place.component';
import { DatePipe } from '@angular/common';
import { ContractTableComponent } from './manage-contract/contract-table/contract-table.component';

ContractDetailsComponent

registerLocaleData(localeFr);

@NgModule({
  
  declarations: [
    
    AppComponent,
    ManageTenantComponent,
    ManagePropertiesComponent,
    HeaderComponent,
    HomeComponent,
    TenantFormComponent,
    TenantDetailsComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    InProgressComponent,
    MainTenantDetailsComponent,
    ContractDetailsComponent,
    AddressDetailsComponent,
    TestComponent,
    ManageContractComponent,
    ContractDetComponent,
    ContractInfoComponent,
    ContractPriceComponent,
    ContractPaymentComponent,
    ContractVehicleComponent,
    ContractPlaceComponent,
    ContractTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DpDatePickerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,        
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    MatSortModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'},
    MatDatepickerModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
