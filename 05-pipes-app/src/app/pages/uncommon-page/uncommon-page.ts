import { Component, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
  name: 'Victor',
  gender: 'male',
  age: 36,
  address: 'ottawa',
};

const client2 = {
  name: 'Victoria',
  gender: 'female',
  age: 36,
  address: 'ottawa',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [Card, AsyncPipe, TitleCasePipe, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe],
  templateUrl: './uncommon-page.html',
  styleUrl: './uncommon-page.css',
})
export class UncommonPage {
  // i18nSelect
  client = signal(client1);
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };
  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  // i18nPlural

  clientsMap = signal({
    '=0': 'No tenemos ningun cliente',
    '=1': 'Tenemos un cliente',
    '=2': 'Tenemos dos clientes',
    other: 'Tenemos # clientes',
  });

  clients = signal(['Maria', 'Pedro', 'Fernando', 'Andrea', 'Juan', 'victor', 'sofia']);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  //keyValuePipe

  profile = {
    name: 'Victor',
    age: 36,
    address: 'Mexico cdmx'
  }

  //asyncPipe

  promiseValue:Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa');
      console.log('Promesa finalizada')
    }, 1000);
  });

  myObservableTimer = interval(2000).pipe(
    tap((value) => console.log('tap',value))
  )

}
