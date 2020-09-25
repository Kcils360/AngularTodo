import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';


@Component({
  selector: 'app-list-manager',
  template: `
  <div class="todo-app">
    <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

    <ul>
      <li *ngFor="let todoItem of todoListService.TodoList$ | async">
      <app-todo-item [item]="todoItem"
      (remove)="removeItem($event)"
      (update)="updateItem($event)"></app-todo-item>
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  constructor(private todoListService:TodoListService) { }
  ngOnInit(): void {
  }

  addItem(title: string): void {
    const newTodo: TodoItem = {title} as TodoItem;
    this.todoListService
      .addItem(newTodo)
  }

  removeItem(item: TodoItem): void {
    this.todoListService
      .deleteItem(item)
  }

  updateItem(item: TodoItem): void {
    this.todoListService
      .updateItem(item)
  }

}
