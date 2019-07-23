import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EXCEL_FILE_VALIDATOR } from 'src/app/email/email-send/mime-type.validator';
import { ClientManagementService } from '../ClientManagement.service';

@Component({
  selector: 'app-upload-bulk-client',
  templateUrl: './upload-bulk-client.component.html',
  styleUrls: ['./upload-bulk-client.component.css']
})
export class UploadBulkClientComponent implements OnInit {


  fileName: string;
  attachmentName: string;
  form: FormGroup;
  filePreview: string;
  excelPickerClicked = false;
  attachmentPickerClicked = false;
  clearIcon = false;
  clearAttachmentFileIcon = false;


  constructor(private clientService: ClientManagementService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'ClientExcel': new FormControl(null, {validators: [], asyncValidators: [EXCEL_FILE_VALIDATOR]})
    });
  }

  clientUpload() {
    if(this.form.invalid) {
      this.form.reset();
      this.fileName = '';
      return;
    }
    else {
    this.clientService.uploadClientList(this.form.value.ClientExcel);
    this.form.reset();
    this.fileName = '';
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });
    }
  }

  onFilePicked(event: Event) {
    this.excelPickerClicked = true;
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ClientExcel : file});
    this.form.get('ClientExcel').updateValueAndValidity();
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
    this.form.get('ClientExcel').setValue(null);
    this.form.get('ClientExcel').setErrors(null);
    this.fileName = '';
    this.clearIcon = false;
  }

  resetForm() {
    this.form.reset();
    this.fileName = '';
  }

}
