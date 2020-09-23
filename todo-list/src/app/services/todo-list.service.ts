import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

 @Injectable({
    providedIn: 'root'
  })

export class TodoListService {
   todosUrl = 'https://localhost:44387/api/todo'  //run the api server and make sure URLs match
   todoList: BehaviorSubject<TodoItem[]> = new BehaviorSubject([]);
   public ToDoList: Observable<TodoItem[]>;
   constructor(private apiService: ApiService) {
    this.getTodoList().subscribe(todo => this.todoList.next(todo));
    this.ToDoList = this.todoList.asObservable();
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

  updateItem(item: TodoItem): Observable<TodoItem> {
    this.todoList.next( [...this.todoList.getValue().filter(t => t.title !== item.title), item])
    return this.apiService.updateItem(item);
  }

  deleteItem(item: TodoItem): Observable<TodoItem[]> {
    return this.apiService.deleteItem(item)
      .pipe(
        share()
    );
  }

}
