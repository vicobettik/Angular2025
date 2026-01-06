
import { Component, computed, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../../components/dragonball/character-list/character-list";
import { Character } from '../../../interfaces/character.interface';
import { CharacterAddComponent } from '../../../components/dragonball/character-add/character-add.component';
import { DragonBallService } from '../../../services/dragonball.service';



@Component({
  selector:'dragonball-super',
  imports: [CharacterListComponent,CharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {

  dragonBallService = inject(DragonBallService);
  characters = this.dragonBallService.characters;

  addCharacter(character:Character){
    this.dragonBallService.addCharacter(character);
  }

}
