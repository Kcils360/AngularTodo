import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
  <p>{{ title }}</p>
  <input #inputElementRef
         [value]="title" 
         (keyup.enter)="changeTitle($event.target.value)" >
  <button (click)="changeTitle(inputElementRef.value)">Save</button>
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
