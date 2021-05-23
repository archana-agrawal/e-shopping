import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product: any[], filterText: string): any {
    return product ? product.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
