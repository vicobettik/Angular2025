import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { I18nSelectPipe } from '@angular/common';

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
  imports: [Card, I18nSelectPipe],
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


}
