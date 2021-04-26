import { Component } from '@angular/core';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="getList()">Get List</button>

    <ul>
      <li *ngFor="let todo of todos; let i = index">
        <input type="checkbox" [checked]="todo.completed" (change)="handleCompleteChange($event, todo, i)">
        {{todo.title}}
      </li>
    </ul>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  getList(): void {
    this.todoService.list().subscribe(todos => (this.todos = todos));
  }

  handleCompleteChange(event: Event, todo: Todo, index: number): void {
    const completed = (event.target as HTMLInputElement).checked;
    this.todoService.update({ ...todo, completed }).subscribe((result: Todo) => {
      this.todos.splice(index, 1, result);
    });
  }
}
