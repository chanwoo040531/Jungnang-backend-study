import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1)
      throw new NotFoundException(`Todo with id ${id} not found`);
    this.todos.splice(index, 1);
  }
}
