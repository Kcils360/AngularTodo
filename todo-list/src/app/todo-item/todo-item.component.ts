import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  template: `
  <div class="todo-item">
    <input type="checkbox"
            [checked]="item.completed"
            class="todo-checkbox"
            (click)="completeItem()" />
        <span class="todo-title" [ngClass]="{'todo-complete': item.completed}">
          {{ item.title }}
        </span>
    <button class="btn btn-red" (click)="removeItem()">remove</button>
  </div>
  `,
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem;
  @Output() remove: EventEmitter<TodoItem> = new EventEmitter();
  @Output() update: EventEmitter<TodoItem> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  completeItem() {
    this.item = {...this.item, "completed": true}
    this.update.emit(this.item);
  }

}
