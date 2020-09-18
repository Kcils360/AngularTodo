import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { catchError, share } from 'rxjs/operators';


 @Injectable({
    providedIn: 'root'
  })

export class TodoListService {
   todosUrl = 'https://localhost:44387/api/todo'  //run the api server and make sure URLs match
  //  todoList: Observable<TodoItem[]>;
      todoList: TodoItem[];
   constructor(private apiService: ApiService) {
    this.todoList = this.getTodoList();
  }

   //get todos from C# server
   getTodoList(): Observable<TodoItem[]> {
     return this.apiService.getList()
       .pipe(
         share() //Always add a share operator to a network call. This way if two subscribers subscribe to this observable, the call will only be made once.
       );
   }

  addItem(item: TodoItem): Observable<TodoItem> {
    return this.apiService.addItem(item)
    .pipe(
      share()
      );
  }

  //Avoid using any. In this case refactor the calling code so it applies the changes to the item and sends it to the list
  updateItem(item: TodoItem): void {
    // const index = this.todoList.indexOf(item);
    this.todoList = [...this.todoList.filter(t => t.title !== item.title), item];
  }

  deleteItem(item: TodoItem): void {
    //THIS IS DESTRUCTIVE NEVER DO THIS
    // this.todoList.splice(index, 1);
    //CREATE A NEW LIST INSTEAD
    this.todoList = this.todoList.filter(t => t.title !== item.title);
    // this.saveList(this.todoList);// make this use the apiService
  }

}
