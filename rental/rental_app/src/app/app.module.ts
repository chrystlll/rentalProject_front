import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageTenantComponent } from './manage-tenant/manage-tenant.component';
import { ManageReceiptComponent } from './manage-receipt/manage-receipt.component';
import { LoginComponent } from './login/login.component';
import { ManagePropertiesComponent } from './manage-properties/manage-properties.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TenantFormComponent } from './manage-tenant/tenant-form/tenant-form.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TenantDetailsComponent } from './manage-tenant/tenant-details/tenant-details.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ManageTenantComponent,
    ManageReceiptComponent,
    LoginComponent,
    ManagePropertiesComponent,
    HeaderComponent,
    HomeComponent,
    TenantFormComponent,
    TenantDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DpDatePickerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
