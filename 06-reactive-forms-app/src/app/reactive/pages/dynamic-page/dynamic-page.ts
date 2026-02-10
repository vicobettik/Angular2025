import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/formUtils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css',
})
export class DynamicPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['metal gear', [Validators.required]],
        ['ori', [Validators.required]],
      ],
      [Validators.minLength(3)],
    ),
  });

  newFavoriteGame = this.fb.control('',[Validators.required])

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if (this.newFavoriteGame.invalid) {
      return;
    }

    const newFavorite = this.newFavoriteGame.value;
    this.favoriteGames.push(this.fb.control(newFavorite,[Validators.required]))
    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(index:number){
    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    console.log('submit')
    this.myForm.markAllAsTouched();
  }

}
