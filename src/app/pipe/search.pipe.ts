import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;
console.log(args);

    args = args.toLowerCase();
    return value.filter(function (name:any) {
      return JSON.stringify(name)
        .toLowerCase().includes(args);
    });
  }

}
