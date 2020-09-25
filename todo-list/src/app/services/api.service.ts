import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  todosUrl = 'https://localhost:44387/api/todo';

  constructor(private http: HttpClient) { }

  getList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.todosUrl);
  }

  addItem(item: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todosUrl, item);
  }

  updateItem(item: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(this.todosUrl, item);
  }

  deleteItem(item: TodoItem): Observable<TodoItem> {
    console.log('api service hit', item)
    return this.http.delete<TodoItem[]>(`${this.todosUrl}/${item.title}`).pipe(
      map(_ => item)
    );
  }

}
