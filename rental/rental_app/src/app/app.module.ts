import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageTenantComponent } from './manage-tenant/manage-tenant.component';
import { ManageReceiptComponent } from './manage-receipt/manage-receipt.component';
import { ManagePropertiesComponent } from './manage-properties/manage-properties.component';
import { HeaderComponent } from './_components/header/header.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './manage-tenant/tenant-form/tenant-form.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TenantDetailsComponent } from './manage-tenant/tenant-details/tenant-details.component';
import { LoginComponent } from './_components/login/login.component';
import { SignInComponent } from './_components/login/sign-in/sign-in.component';
import { SignUpComponent } from './_components/login/sign-up/sign-up.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddressDetailsComponent } from './manage-tenant/address-details/address-details.component';
import { InProgressComponent } from './_components/in-progress/in-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageTenantComponent,
    ManageReceiptComponent,
    ManagePropertiesComponent,
    HeaderComponent,
    HomeComponent,
    TenantFormComponent,
    TenantDetailsComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    AddressDetailsComponent,
    InProgressComponent
    
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
    MatPaginatorModule

  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
