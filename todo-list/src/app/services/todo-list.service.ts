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
      // todoList: TodoItem[];
   constructor(private apiService: ApiService) {
    // this.todoList = this.getTodoList();
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

  //Avoid using any. In this case refactor the calling code so it applies the changes to the item and sends it to the list
  updateItem(item: TodoItem): void {
    // const index = this.todoList.indexOf(item);
    this.todoList.next( [...this.todoList.getValue().filter(t => t.title !== item.title), item])
    this.apiService.updateItem(item);
  }

  deleteItem(item: TodoItem): void {
    //THIS IS DESTRUCTIVE NEVER DO THIS
    // this.todoList.splice(index, 1);
    //CREATE A NEW LIST INSTEAD
    this.todoList.next( this.todoList.getValue().filter(t => t.title !== item.title));
    // this.saveList(this.todoList);// make this use the apiService
  }

}
