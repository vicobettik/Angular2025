import { UpperCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.component.html',
  imports:[UpperCasePipe]
})
export class HeroPageComponent{

  name = signal('Ironman');
  age = signal(45);

  getHeroDescription(){
    return `${ this.name() } - ${ this.age() }`;
  }

  changeHero(){
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm(){
    this.name.set('Ironman');
    this.age.set(45);
  }

  chageAge(){
    this.age.set(60);
  }

}
