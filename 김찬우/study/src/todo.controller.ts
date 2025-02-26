import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TodoService} from './todo.service';
import {ApiResponse, TodoDetailResponse, TodoRequest, TodoResponse} from "./todo.dto";

@Controller("v1/todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Post()
  async create(@Body() request: TodoRequest) {
    return this.todoService.save(request)
        .then(todo => TodoResponse.from(todo))
        .then(todoResponse => ApiResponse.success(todoResponse));
  }

  @Get()
  async getAll() {
    return this.todoService.getAll()
        .then(todos => todos.map(todo => TodoResponse.from(todo)))
        .then(todoResponses => ApiResponse.success(todoResponses));
  }

  @Get(":todoId")
  async getTodo(@Param('todoId') todoId: string) {
    return this.todoService.getTodo(todoId)
        .then(todo => TodoDetailResponse.from(todo))
        .then(todoResponse => ApiResponse.success(todoResponse));
  }

  @Put(":todoId")
  async updateTodo(
      @Param('todoId') todoId: string,
      @Body() request: TodoRequest
  ) {
    return this.todoService.updateTodo(todoId, request)
        .then(todo => TodoDetailResponse.from(todo))
        .then(todoResponse => ApiResponse.success(todoResponse));
  }

  @Delete(":todoId")
  async delete(@Param('todoId') todoId: string) {
    return this.todoService.deleteTodo(todoId)
        .then(() => ApiResponse.success("Todo deleted successfully"));
  }
}
