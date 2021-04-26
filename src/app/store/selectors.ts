import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../interfaces/todo.interface';

const selectState = createFeatureSelector<ReadonlyArray<Todo>>('todos');
export const selectTodos = createSelector(selectState, state => state);
export const selectTodoCount = createSelector(selectTodos, todos => todos.length);
