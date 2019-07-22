import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';

import { AuthGuard } from './Auth/auth.guard';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { GenerateBillComponent } from './billing-app/generate-bill/generate-bill.component';
import { ViewPreviousInvoicesComponent } from './billing-app/view-previous-invoices/view-previous-invoices.component';
import { StepperComponent } from './intro-slider/stepper/stepper.component';
import { CompanyInfoComponent } from './app-start/company-info/company-info.component';
import { AddNewClientComponent } from './client-store/add-new-client/add-new-client.component';
import { AppStartComponent } from './app-start/app-start-page/app-start.component';
import { EmailSendComponent } from './email/email-send/email-send.component';
import { EmailHistoryComponent } from './email/email-history/email-history.component';
import { SmsSendComponent } from './sms/sms-send/sms-send.component';
import { SmsHistoryComponent } from './sms/sms-history/sms-history.component';

const routes: Routes = [
  {path: '', component:AppStartComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'createBill', component: GenerateBillComponent, canActivate: [AuthGuard]},
  {path: 'viewBills', component: ViewPreviousInvoicesComponent, canActivate: [AuthGuard]},
  {path: 'startModule', component: StepperComponent, canActivate: [AuthGuard]},
  {path: 'viewCompanyProfile', component: CompanyInfoComponent, canActivate: [AuthGuard]},
  {path: 'addNewClient', component: AddNewClientComponent, canActivate:[AuthGuard]},
  {path: 'sendEmail', component:EmailSendComponent, canActivate: [AuthGuard]},
  {path: 'viewEmail', component:EmailHistoryComponent, canActivate: [AuthGuard]},
  {path: 'sendSMS', component:SmsSendComponent, canActivate: [AuthGuard]},
  {path: 'viewSMS', component:SmsHistoryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
