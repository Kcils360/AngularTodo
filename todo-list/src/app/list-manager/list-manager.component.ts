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
      (update)="updateItem($event)"></app-todo-item>
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

  addItem(title: string): void {
    const newTodo: TodoItem = {title} as TodoItem;
    this.todoListService
      .addItem(newTodo)
      .subscribe(_todo => this.todoList.push(newTodo));
  }

  removeItem(item: TodoItem): void {
    // console.log('list-manager hit', item);
    this.todoListService
      .deleteItem(item)
      .subscribe(_todoList => this.todoList = _todoList);
  }

  updateItem(item: TodoItem): void {
    this.todoListService
      //TODO: apply the changes to the item, then send it to the ListService
      .updateItem(item)
      .subscribe();
  }

  getTodoList(): void {
    this.todoListService
      .getTodoList()
      .subscribe(todos => this.todoList = todos)
  }

}
