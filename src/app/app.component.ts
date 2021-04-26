import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from './interfaces/todo.interface';
import * as fromActions from './store/actions';
import { selectTodos } from './store/selectors';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="getList()">Get List</button>

    <form ngForm (ngSubmit)="handleSubmit()">
      <fieldset>
        <legend>New Todo</legend>
        <input type="text" name="title" [(ngModel)]="newTitle" required>
        <button>SUBMIT</button>
      </fieldset>
    </form>

    <ul>
      <li *ngFor="let todo of todos$ | async; let i = index">
        <input type="checkbox" [checked]="todo.completed" (change)="handleCompleteChange($event, todo, i)">
        {{todo.title}}
      </li>
    </ul>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  todos$ = this.store.select(selectTodos);
  newTitle = '';
  private unsubscribe$ = new Subject();

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(fromActions.createTodoSuccess, fromActions.createTodoError),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => this.newTitle = '');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getList(): void {
    this.store.dispatch(fromActions.getList());
  }

  handleCompleteChange(event: Event, todo: Todo, index: number): void {
    const completed = (event.target as HTMLInputElement).checked;
    this.store.dispatch(fromActions.updateTodo({ todo: { ...todo, completed } }));
  }

  handleSubmit(): void {
    this.store.dispatch(fromActions.createTodo({ todo: { title: this.newTitle, completed: false } }));
  }
}
