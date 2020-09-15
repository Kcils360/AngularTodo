import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
  <p>input-button-unit works!
      the title is: {{ title }}
  </p>
  <input [value]="title" 
         (keyup.enter)="changeTitle($event.target.value)" >
  <button (click)="changeTitle('Button Clicked!')">Save</button>
  `,
  styleUrls: ['./input-button-unit.component.css']
})
export class InputButtonUnitComponent implements OnInit {
  title = 'New Button';
  constructor() {  }

  ngOnInit(): void { }

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
}
