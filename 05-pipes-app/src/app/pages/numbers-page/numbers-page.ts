import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe, PercentPipe, CurrencyPipe],
  templateUrl: './numbers-page.html',
  styleUrl: './numbers-page.css',
})
export class NumbersPage {

  totalSells = signal(2513145.5587);
  percent = signal(0.4856);

}
