import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { AppStartComponent } from './app-start/app-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Auth/auth-interceptor';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { GenerateBillComponent } from './billing-app/generate-bill/generate-bill.component';
import { ViewPreviousInvoicesComponent } from './billing-app/view-previous-invoices/view-previous-invoices.component';
import { StepperComponent } from './intro-slider/stepper/stepper.component';
import { CompanyInfoComponent } from './app-start/company-info/company-info.component';
import { AddNewClientComponent } from './client-store/add-new-client/add-new-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AppStartComponent,
    HeaderComponent,
    SidenavComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    GenerateBillComponent,
    ViewPreviousInvoicesComponent,
    StepperComponent,
    CompanyInfoComponent,
    AddNewClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ForgotPasswordComponent, StepperComponent]
})
export class AppModule { }
