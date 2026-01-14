import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  gifService = inject(GifsService);
  gifs = signal<Gif[]>([]);


  onSearch(query: string){

    console.log(query);
    this.gifService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });

  }

}
