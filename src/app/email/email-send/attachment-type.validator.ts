import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const ATTACHMENT_TYPE_VALIDATOR = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  let ext;
  const file = control.value as File;
  const fileReader = new FileReader();

  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        let isValid = false;
        ext = file.name.split('.')[1];
        console.log(file);
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        console.log(header);
        switch (header) {
          case '89504e47': // PNG
            isValid = true;
            break;
          case '504b34': //Xlsx, docx, pptx
            if(ext==='xlsx' || ext ==='docx' || ext==='pptx')
              isValid = true;
              break;
          case 'd0cf11e0': //xls, doc, ppt
              isValid = true;
              break;
          case '25504446'://pdf
              isValid = true;
              break;
          case 'ffd8ffe0': //Jpg JPEG
              isValid = true;
              break;
          case '0001c': // mp4
            isValid = true;
            break;
          case 'fffb9060':
              isValid = true;
              break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidAttachment: true });
        }
        observer.complete();
      });
      if(file !== null) {
        fileReader.readAsArrayBuffer(file);
      }
    }
  );
  return frObs;
};
