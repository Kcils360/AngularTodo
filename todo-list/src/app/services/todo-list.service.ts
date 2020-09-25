import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { ApiService } from './api.service';
import { BehaviorSubject, merge, Observable, Subject, zip } from 'rxjs';
import { catchError, map, mergeAll, mergeMap, share, switchMap, withLatestFrom, zipAll } from 'rxjs/operators';

 @Injectable({
    providedIn: 'root'
  })

export class TodoListService {
   todosUrl = 'https://localhost:44387/api/todo'  //run the api server and make sure URLs match
   private todoList$: BehaviorSubject<TodoItem[]> = new BehaviorSubject([]);
   public ToDoList$: Observable<TodoItem[]>;
   private itemAdded$: Subject<TodoItem> = new Subject();
   private itemUpdated$: Subject<TodoItem> = new Subject();
   private itemDeleted$: Subject<TodoItem> = new Subject();
   
   constructor(private apiService: ApiService) {
    this.getTodoList().subscribe(todo => this.todoList$.next(todo));
    this.ToDoList$ = this.todoList$.asObservable();

    const itemAdded$ = this.itemAdded$.pipe(
      switchMap(item => this.apiService.addItem(item)),
      withLatestFrom(this.todoList$),
      switchMap(([item, items]) => this.AddItem$(item, items))
    );

    const itemDeleted$ = this.itemDeleted$.pipe(
      switchMap(item => this.apiService.deleteItem(item)),
      withLatestFrom(this.todoList$),
      map(([itemToRemove, items]) => items.filter(i => i.title === itemToRemove.title))
    );
    merge(itemAdded$, itemDeleted$).subscribe(items => this.todoList$.next(items));
  }

  AddItem$ = (item: TodoItem, items: TodoItem[]): Observable<TodoItem[]> => new Observable(obs => {
    obs.next([...items, item]);
    obs.complete();
  });

   //get todos from C# server
   getTodoList(): Observable<TodoItem[]> {
     return this.apiService.getList()
       .pipe(
         share() //Always add a share operator to a network call. This way if two subscribers subscribe to this observable, the call will only be made once.
       );
   }

  addItem(item: TodoItem): void {
    this.itemAdded$.next(item);
  }

  updateItem(item: TodoItem): void {
    this.itemUpdated$.next(item);
  }

  deleteItem(item: TodoItem): void {
    this.itemDeleted$.next(item);
  }

}
