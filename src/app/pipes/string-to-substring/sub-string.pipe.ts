import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subString'
})
export class SubStringPipe implements PipeTransform {

  transform(data?: string) {
    return data?.substring(0, data.indexOf("/"));  }

}
