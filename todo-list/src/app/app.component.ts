import { Component } from '@angular/core';
import { TodoItem } from '../app/interfaces/todo-item';

@Component({
  selector: 'app-root',
  template: `<h1>
  Welcome to {{ title }}!
</h1>
<app-input-button-unit></app-input-button-unit>

<ul>
  <li *ngFor="let todoItem of todoList">
    <app-todo-item [item]="todoItem"></app-todo-item>
  </li>
</ul>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Over-Engineered eXtraBaller ToDo Application Software Website';
  todoList: TodoItem[] = [
    {title: 'install NodeJS'},
    {title: 'install Angular CLI'},
    {title: 'create new app'},
    {title: 'serve app'},
    {title: 'develop app'},
    
  ];
}
