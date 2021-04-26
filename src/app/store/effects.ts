import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Todo } from '../interfaces/todo.interface';
import * as fromActions from './actions';

@Injectable()
export class TodoEffects {
  getList$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getList),
    switchMap(() => this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
      map(todos => fromActions.getListSuccess({ todos })),
      catchError(error => of(fromActions.getListError({ error }))),
    )),
  ));

  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.updateTodo),
    switchMap(action => this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${action.todo.id}`, action.todo).pipe(
      map(todo => fromActions.updateTodoSuccess({ todo })),
      catchError(error => of(fromActions.updateTodoError({ error }))),
    )),
  ));

  createTodo$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.createTodo),
    switchMap(action => this.http.post<Todo>(`https://jsonplaceholder.typicode.com/todos`, action.todo).pipe(
      map(todo => fromActions.createTodoSuccess({ todo })),
      catchError(error => of(fromActions.createTodoError({ error }))),
    )),
  ));

  constructor(private actions$: Actions, private http: HttpClient) {}
}
