import {Controller, Delete, Get, Param, Put} from '@nestjs/common';
import {TodoService} from './todo.service';
import {ApiResponse, TodoRequest, TodoResponse} from "./todo.dto";

@Controller("v1/todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getAll(): ApiResponse<TodoResponse[]> {
    const todoList = this.todoService.getAll()
        .map(todo => TodoResponse.from(todo));

    return ApiResponse.success(todoList);
  }

  @Get(":todo-id")
  getTodo(@Param('todo-id') todoId: string): ApiResponse<TodoResponse> {

    const todo = this.todoService.getTodo(todoId);
    const todoResponse = TodoResponse.from(todo);

    return ApiResponse.success(todoResponse);
  }

  @Put(":todo-id")
  updateTodo(
      @Param('todo-id') todoId: string,
      @Param('todo') request: TodoRequest
  ): ApiResponse<TodoResponse> {
    const updatedTodo = this.todoService.updateTodo(todoId, request.toTodo(todoId));
    const todoResponse = TodoResponse.from(updatedTodo);

    return ApiResponse.success(todoResponse);
  }

  @Delete(":todo-id")
  delete(
      @Param('todo-id') todoId: string,
  ) {
    this.todoService.deleteTodo(todoId);

    return ApiResponse.success("Todo deleted");
  }
}
