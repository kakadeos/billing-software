import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { EXCEL_FILE_VALIDATOR } from './mime-type.validator';
import { EmailService } from '../email.service';
import { ATTACHMENT_TYPE_VALIDATOR } from './attachment-type.validator';

@Component({
  selector: 'app-email-send',
  templateUrl: './email-send.component.html',
  styleUrls: ['./email-send.component.css']
})
export class EmailSendComponent implements OnInit {

  fileName: string;
  attachmentName: string;
  form: FormGroup;
  filePreview: string;
  excelPickerClicked = false;
  attachmentPickerClicked = false;
  clearIcon = false;
  clearAttachmentFileIcon = false;
  formError : string;


  constructor(public emailService: EmailService) { }

  ngOnInit() {
    this.formError = '';
    this.form = new FormGroup({
      'EmailIDTo': new FormControl('', {}),
      'EmailIDCc': new FormControl('', {validators:[Validators.email]}),
      'EmailIDBcc': new FormControl('', {validators:[Validators.email]}),
      'EmailSubject': new FormControl('', {validators:[Validators.required, Validators.minLength(3)]}),
      'EmailContent': new FormControl('', {validators:[Validators.required, Validators.minLength(3)]}),
      'EmailExcel': new FormControl(null, { asyncValidators: [EXCEL_FILE_VALIDATOR]}),
      'EmailAttachment': new FormControl(null, {asyncValidators:[ATTACHMENT_TYPE_VALIDATOR]})
    });
  }

  emailSend() {
    console.log(this.form);
    if(this.form.invalid) {
      this.form.reset();
      this.fileName = '';
      this.attachmentName = '';
      this.formError = 'Please specify all the Required Fields';
      return;
    }
    if(this.form.value.EmailIDTo === null || this.form.value.EmailExcel === null) {
      this.formError = 'Please attach valid Receipient list and add required data';
      return;
    }

    this.emailService.sendEmail(this.form.value.EmailIDTo, this.form.value.EmailIDCc, this.form.value.EmailIDBcc, this.form.value.EmailSubject,
    this.form.value.EmailContent,this.form.value.EmailExcel, this.form.value.EmailAttachment);
    this.form.reset();
    this.fileName = '';
    this.attachmentName =  '';
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });
  }

  onFilePicked(event: Event) {
    this.excelPickerClicked = true;
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({EmailExcel : file});
    this.form.get('EmailExcel').updateValueAndValidity();
    if(file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
        this.form.get('EmailIDTo').disable();
        this.clearIcon = true;
      }
      reader.readAsDataURL(file);
      this.fileName = file.name;
    }
  }

  onAttachementPick(eventAttachementPick: Event) {
    this.attachmentPickerClicked = true;
    const file = (eventAttachementPick.target as HTMLInputElement).files[0];
    this.form.patchValue({EmailAttachment : file});
    this.form.get('EmailAttachment').updateValueAndValidity();
    if(file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result as string;
        this.clearAttachmentFileIcon = true;
      }
      reader.readAsDataURL(file);
      this.attachmentName = file.name;
    }
  }

  clearSelectedFile() {
    this.form.get('EmailExcel').setValue(null);
    this.form.get('EmailExcel').setErrors(null);
    this.fileName = '';
    this.clearIcon = false;
    this.form.get('EmailIDTo').enable();
  }

  clearAttachmentFile() {
    this.form.get('EmailAttachment').setValue(null);
    this.form.get('EmailAttachment').setErrors(null);
    this.attachmentName = '';
    this.clearAttachmentFileIcon = false;
  }
  resetForm() {
    this.form.reset();
    this.fileName = '';
    this.attachmentName =  '';
  }

}
