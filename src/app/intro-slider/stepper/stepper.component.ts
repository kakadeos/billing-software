import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  isLinear = false;
  imagePreview : any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public passedData,
   private dialogRef: MatDialogRef<StepperComponent>) {
     dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required],
      companyGSTN: ['', Validators.required],
      companyLogo: [null, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      companyAddressInitial: ['', Validators.required],
      companyAddressPart2: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyPincode: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      companyState: ['', Validators.required],
      companyCountry: ['', Validators.required]
    });
  }

  onImagePicked(event: Event) {
    console.log('clicked here');
    const file = (event.target as HTMLInputElement).files[0];
    this.firstFormGroup.patchValue({ companyLogo: file });

    this.firstFormGroup.get('companyLogo').updateValueAndValidity();
    console.log(this.firstFormGroup.get('companyLogo').value);
    this.passedData.companyLogo = this.firstFormGroup.get('companyLogo').value;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
