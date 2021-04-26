import { createAction, props } from '@ngrx/store';
import { Todo } from '../interfaces/todo.interface';

export const getList = createAction('[Todo] Get List');
export const getListSuccess = createAction('[Todo] Get List Success', props<{todos: Todo[]}>());
export const getListError = createAction('[Todo] Get List Error', props<{error: Error}>());

export const updateTodo = createAction('[Todo] Update', props<{todo: Todo}>());
export const updateTodoSuccess = createAction('[Todo] Update Success', props<{todo: Todo}>());
export const updateTodoError = createAction('[Todo] Update Error', props<{error: Error}>());

export const createTodo = createAction('[Todo] Create', props<{todo: Todo}>());
export const createTodoSuccess = createAction('[Todo] Create Success', props<{todo: Todo}>());
export const createTodoError = createAction('[Todo] Create Error', props<{error: Error}>());
