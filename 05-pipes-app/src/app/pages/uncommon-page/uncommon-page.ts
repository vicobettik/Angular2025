import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common';

const client1 = {
  name:'Victor',
  gender: 'male',
  age: 36,
  address: 'ottawa'
}

const client2 = {
  name:'Victoria',
  gender: 'female',
  age: 36,
  address: 'ottawa'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [Card, I18nSelectPipe, I18nPluralPipe,SlicePipe,JsonPipe,UpperCasePipe],
  templateUrl: './uncommon-page.html',
  styleUrl: './uncommon-page.css',
})
export class UncommonPage {

  // i18nSelect
  client = signal(client1);
  invitationMap = {
    male:'invitarlo',
    female: 'invitarla'
  }
  changeClient(){
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
    other: 'Tenemos # clientes'
  })

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Andrea',
    'Juan',
    'victor',
    'sofia'
  ]);

  deleteClient(){
    this.clients.update((prev) => prev.slice(1));
  }

}
