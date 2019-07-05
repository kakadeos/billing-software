import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { AppStartComponent } from './app-start/app-start.component';
import { AuthGuard } from './Auth/auth.guard';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { GenerateBillComponent } from './billing-app/generate-bill/generate-bill.component';
import { ViewPreviousInvoicesComponent } from './billing-app/view-previous-invoices/view-previous-invoices.component';
import { StepperComponent } from './intro-slider/stepper/stepper.component';
import { CompanyInfoComponent } from './app-start/company-info/company-info.component';

const routes: Routes = [
  {path: '', component:AppStartComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'createBill', component: GenerateBillComponent, canActivate: [AuthGuard]},
  {path: 'viewBills', component: ViewPreviousInvoicesComponent, canActivate: [AuthGuard]},
  {path: 'startModule', component: StepperComponent, canActivate: [AuthGuard]},
  {path: 'viewCompanyProfile', component: CompanyInfoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
