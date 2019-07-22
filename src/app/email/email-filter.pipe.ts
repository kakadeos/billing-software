import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailFilter',
  pure: false
})
export class EmailFilterPipe implements PipeTransform {

  transform(value: any, search: string): any {
    if (!value) return [];
    if (!search) return value;
    search = search.toLowerCase();
    return value.filter(it => {
      return it.toLowerCase().includes(search);
    });
  }
}
