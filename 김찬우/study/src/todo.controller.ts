import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TodoService} from './todo.service';
import {ApiResponse, TodoRequest, TodoDetailResponse, TodoResponse} from "./todo.dto";
import {UuidFactory} from "@nestjs/core/inspector/uuid-factory";
import {Todo} from "./todo.domain";

@Controller("v1/todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Post()
    create(@Body() request: TodoRequest): ApiResponse<TodoDetailResponse> {
        const uuid = UuidFactory.get();
        const todo = this.todoService.save(this.toTodo(uuid, request));
        const todoResponse = TodoDetailResponse.from(todo);

        return ApiResponse.success(todoResponse);
    }

    @Get()
    getAll(): ApiResponse<TodoResponse[]> {
        const todoList = this.todoService.getAll()
            .map(todo => TodoResponse.from(todo));

        return ApiResponse.success(todoList);
    }

    @Get(":todoId")
    getTodo(@Param('todoId') todoId: string): ApiResponse<TodoDetailResponse> {

        const todo = this.todoService.getTodo(todoId);
        const todoResponse = TodoDetailResponse.from(todo);

        return ApiResponse.success(todoResponse);
    }

    @Put(":todoId")
    updateTodo(
        @Param('todoId') todoId: string,
        @Body() request: TodoRequest
    ): ApiResponse<TodoDetailResponse> {
        const updatedTodo = this.todoService.updateTodo(todoId, this.toTodo(todoId, request));
        const todoResponse = TodoDetailResponse.from(updatedTodo);

        return ApiResponse.success(todoResponse);
    }

    @Delete(":todoId")
    delete(
        @Param('todoId') todoId: string,
    ) {
        this.todoService.deleteTodo(todoId);

        return ApiResponse.success("Todo deleted");
    }

    private toTodo(id: string, request: TodoRequest): Todo {
        return new Todo(
            id,
            request.title,
            request.description,
            request.done,
            request.createdAt,
            request.lastUpdatedAt
        );
    }
}
