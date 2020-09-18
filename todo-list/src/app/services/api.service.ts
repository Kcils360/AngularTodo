import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { TodoItem } from '../interfaces/todo-item';


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

}
