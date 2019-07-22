import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const EXCEL_FILE_VALIDATOR = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  let ext;
  const file = control.value as File;
  const fileReader = new FileReader();
  if(file !== null) {

  }
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        ext = file.name.split('.')[1];
        let header = '';
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case '504b34': //Xlsx
          if(ext==='xlsx') {
            isValid = true;
            break;
          }
          case 'd0cf11e0': //xls
            if(ext==='xls') {
              isValid = true;
              break;
            }
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
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
