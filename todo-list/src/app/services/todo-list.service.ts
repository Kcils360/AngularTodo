import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  {title: 'install NodeJS'},
  {title: 'install Angular CLI'},
  {title: 'create new app'},
  {title: 'serve app'},
  {title: 'develop app'},   
];

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

 @Injectable({
    providedIn: 'root'
  })

export class TodoListService {
   todosUrl = 'https://localhost:44387/api/todo'  //run the durn api server and make sure URLs match
  todoList: TodoItem[];
   constructor(private storageService: StorageService, private http: HttpClient) { 
    // this.todoList = storageService.getData(todoListStorageKey) || defaultTodoList;
  }


   //get todos from C# server
   getTodoList(): Observable<TodoItem[]> {
     return this.http.get<TodoItem[]>(this.todosUrl)
       .pipe(
         share() //Always add a share operator to a network call. This way if two subscribers subscribe to this observable, the call will only be made once.
       );
   }

  addItem(item: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todosUrl, item)
    .pipe(
      share()
      );
      //Methods should only do one thing. Adding and Saving are two seperate actions
      // this.todoList.push(item);
      // this.saveList();
  }

  //Avoid using any. In this case refactor the calling code so it applies the changes to the item and sends it to the list
  updateItem(item: TodoItem, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList = [...this.todoList.filter(t => t.title !== item.title), item];
    // this.saveList();
  }

  deleteItem(item: TodoItem) {
    //THIS IS DESTRUCTIVE NEVER DO THIS
    // this.todoList.splice(index, 1);
    //CREATE A NEW LIST INSTEAD
    this.todoList = this.todoList.filter(t => t.title !== item.title);
    this.saveList(this.todoList);
  }

   saveList(todoList: TodoItem[]) {
     this.storageService.setData(todoListStorageKey, todoList);
  }
}
