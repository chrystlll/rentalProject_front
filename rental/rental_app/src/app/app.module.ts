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

@NgModule({
  declarations: [
    AppComponent,
    ManageTenantComponent,
    ManageReceiptComponent,
    LoginComponent,
    ManagePropertiesComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
