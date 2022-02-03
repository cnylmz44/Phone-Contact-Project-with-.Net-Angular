import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Contact[], filterText: string): Contact[] {
    filterText = filterText?.toLocaleLowerCase()
    return filterText?value.filter((c:Contact)=>c.firsT_NAME.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }
}
