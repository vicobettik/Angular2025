import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.css',
})
export class BasicPage {

  nameLower = signal('victor');
  nameUpper = signal('VICTOR');
  fullName = signal('VicTor FuenTEs MenES');

  customDate = signal(new Date());

}
