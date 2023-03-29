import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'numberToArray',
  pure: true,
})
export class NumberToArrayPipe implements PipeTransform {

  public transform(value: number | undefined):any[] {
    return new Array(value || 0);
  }
}
