import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StepperComponent } from '../intro-slider/stepper/stepper.component';
import { AuthService } from '../Auth/auth.service';
import { Subscription } from 'rxjs';
import { AppStartService } from './appStart.service';

@Component({
  selector: 'app-app-start',
  templateUrl: './app-start.component.html',
  styleUrls: ['./app-start.component.css']
})
export class AppStartComponent implements OnInit {


  private dialogRef ;
  companyName: string;
  companyAddressInitial: string;
  companyAddressPart2: string;
  companyCity: string;
  companyState: string;
  companyCountry: string;
  companyPincode: string;
  companyGSTN: string;

  private firstLoginListener : Subscription;
  firstLogin: string;

  constructor(private dialog: MatDialog, private authService: AuthService,
    private appStartService: AppStartService) { }

  ngOnInit() {
    this.firstLogin = this.authService.getIsItFirstLogin();
    console.log(this.firstLogin);
    if(this.firstLogin === 'true') {
      this.dialogRef = this.dialog.open(StepperComponent,
        {data: {
        companyName: this.companyName,
        companyAddressInitial: this.companyAddressInitial,
        companyAddressPart2: this.companyAddressPart2,
        companyCity: this.companyCity,
        companyState: this.companyState,
        companyCountry: this.companyCountry,
        companyPincode: this.companyPincode,
        companyGSTN: this.companyGSTN
      }}
      );
      this.dialogRef.afterClosed().subscribe(
        companyDetails => {
            this.appStartService.saveCompanyInfo(companyDetails);
        }
      );
    }
  }

}
