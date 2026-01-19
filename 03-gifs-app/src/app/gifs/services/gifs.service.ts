import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'searchHistory';

const loadFromLocalStorage = () => {
  const gifsHistory = localStorage.getItem(GIF_KEY);
  return gifsHistory ? JSON.parse(gifsHistory) : [];
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();

  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY,JSON.stringify(this.searchHistory()));
  })

  loadTrendingGifs(){

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key: environment.giphyApikey,
        limit: 20
      }
    })
    .subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });

  };

  searchGifs(query: string): Observable<Gif[]>{

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
      {
        params:{
          api_key: environment.giphyApikey,
          limit: 20,
          q: query
        }
      }
    ).pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }))
      })

    );
  }

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? []
  }

}
