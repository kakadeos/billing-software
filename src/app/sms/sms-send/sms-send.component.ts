import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SmsService } from '../sms.service';
import { EXCEL_FILE_VALIDATOR } from 'src/app/email/email-send/mime-type.validator';

@Component({
  selector: 'app-sms-send',
  templateUrl: './sms-send.component.html',
  styleUrls: ['./sms-send.component.css']
})
export class SmsSendComponent implements OnInit {

  fileName: string;
  attachmentName: string;
  form: FormGroup;
  filePreview: string;
  excelPickerClicked = false;
  attachmentPickerClicked = false;
  clearIcon = false;
  clearAttachmentFileIcon = false;


  constructor(public smsService: SmsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'SmsExcel': new FormControl(null, {validators: [], asyncValidators: [EXCEL_FILE_VALIDATOR]}),
      'SmsContent': new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]})
    });
  }

  smsSend() {
    if(this.form.invalid) {
      this.form.reset();
      this.fileName = '';
      return;
    }
    this.smsService.smsSend(this.form.value.SmsExcel, this.form.value.SmsContent);
    this.form.reset();
    this.fileName = '';
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });
  }

  onFilePicked(event: Event) {
    this.excelPickerClicked = true;
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({SmsExcel : file});
    this.form.get('SmsExcel').updateValueAndValidity();
    if(file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
        this.clearIcon = true;
      }
      reader.readAsDataURL(file);
      this.fileName = file.name;
    }
  }

  clearSelectedFile() {
    this.form.get('SmsExcel').setValue(null);
    this.form.get('SmsExcel').setErrors(null);
    this.fileName = '';
    this.clearIcon = false;
  }

  resetForm() {
    this.form.reset();
    this.fileName = '';
  }
}
