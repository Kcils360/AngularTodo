import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
  <input class="todo-input"
         #inputElementRef
         placeholder="New Todo"
         (keyup.enter)="submitValue($event.target.value)" >
  <button class="btn" (click)="submitValue(inputElementRef.value)">Save</button>
  `,
  styleUrls: ['./input-button-unit.component.css']
})
export class InputButtonUnitComponent implements OnInit {
  title;
  constructor() {  }

  ngOnInit(): void { }

  @Output() submit: EventEmitter<string> = new EventEmitter();

  submitValue(newTitle: string) {
    this.submit.emit(newTitle);
  }
}
