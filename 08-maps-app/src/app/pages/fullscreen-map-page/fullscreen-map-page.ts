import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';


@Component({
  selector: 'app-fullscreen-map-page',
  imports: [NgxMapLibreGLModule],
  templateUrl: './fullscreen-map-page.html',
  styleUrl: './fullscreen-map-page.css',
})
export class FullscreenMapPage {
alert(arg0: string) {
throw new Error('Method not implemented.');
}

  // Definimos las señales con valores iniciales
  readonly mapStyle = signal(`https://api.maptiler.com/maps/streets-v2/style.json?key=WEeYYBM0sC1riF5Hp7rz`);

  zoom = signal<[number]>([15]);
  // WEeYYBM0sC1riF5Hp7rz
  // 19.373825904296606, -99.16340768342117
  readonly center = signal<[number, number]>([-99.16340768342117, 19.373825904296606]);


  resetearMapa() {
    this.center.set([-74.5, 40]);
    this.zoom.set([15]);
  }

  divElement = viewChild<ElementRef>('map');

  changeZoom(value:string){
    this.zoom.set([+value]);
  }

}
