import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';


@Component({
  selector: 'app-list-manager',
  template: `
  <div class="todo-app">
    <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

    <ul>
      <li *ngFor="let todoItem of todoList">
      <app-todo-item [item]="todoItem"
      (remove)="removeItem($event)"
      (update)="updateItem($event.item, $event.changes)"></app-todo-item>
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  todoList: TodoItem[];

  constructor(private todoListService:TodoListService) { }
  //DONE: ADD TYPES TO ALL OF THESE
  ngOnInit(): void {
    this.getTodoList(); 
  }

  addItem(title: string) {
    const newTodo: TodoItem = {title} as TodoItem;
    this.todoListService
      .addItem(newTodo)
      .subscribe(todo => this.todoList.push());
  }

  removeItem(item: TodoItem) {
    this.todoListService.deleteItem(item);
  }

  updateItem(item: TodoItem, changes: any) {
    this.todoListService.updateItem(item, changes);
  }

  getTodoList() {
    this.todoListService.getTodoList().subscribe(todos => this.todoList = todos)
  }

}
