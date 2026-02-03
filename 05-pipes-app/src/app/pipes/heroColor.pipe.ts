import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

export interface ColorResponse{
  name:string;
  hex:string;
}

@Pipe({
  name: 'heroColor'
})

export class HeroColorPipe implements PipeTransform {
  transform(value:Color): ColorResponse {
    return {
      name: Color[value],
      hex: ColorMap[value]
    }
  }
}
