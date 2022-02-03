import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform( value: Array<any>, args?:any ): any {
    return value.sort((a,b)=>{
      let x = a.firsT_NAME.toLowerCase();
      let y= b.firsT_NAME.toLowerCase();
      if (x<y){
        return -1;
      }
      else{
        return 1;
      }
      return 0;
    });
  }


}
