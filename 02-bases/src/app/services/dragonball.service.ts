import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({providedIn: 'root'})
export class DragonBallService {

    characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Picoro', power: 2000 }
  ]);

  addCharacter(character:Character){
    this.characters.update((list) => [...list,character]);
  }

}
