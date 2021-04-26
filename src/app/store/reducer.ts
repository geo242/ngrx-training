import { createReducer, on } from '@ngrx/store';
import { Todo } from '../interfaces/todo.interface';
import * as fromActions from './actions';

export const initialState: ReadonlyArray<Todo> = [];

export const todoReducer = createReducer(
  initialState,
  on(fromActions.getListSuccess, (state, { todos }) => todos),
  on(fromActions.updateTodoSuccess, (state, {todo}) => {
    return state.map(t => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });
  }),
  on(fromActions.createTodoSuccess, (state, {todo}) => [...state, todo])
);
