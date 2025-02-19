import {Injectable} from '@nestjs/common';
import {Todo} from "./todo.domain";

@Injectable()
export class TodoService {
  todoRepository: Map<string, Todo> = new Map();

  save(todo: Todo): Todo {
    this.todoRepository.set(todo.id, todo);
    return todo;
  }

  getTodo(id: string): Todo {
    return this.todoRepository.get(id) ?? this.throwError("Todo not found");
  }

  getAll(): Todo[] {
    return [...this.todoRepository.values()];
  }

  updateTodo(id: string, todo: Todo): Todo {
    if (!this.todoRepository.has(id)) {
      this.throwError("Todo not found");
    }
    this.todoRepository.set(id, todo);
    return todo;
  }

  deleteTodo(id: string): void {
    if (!this.todoRepository.has(id)) {
      this.throwError("Todo not found");
    }
    this.todoRepository.delete(id);
  }

  private throwError(message: string): never {
    throw new Error(message);
  }
}
