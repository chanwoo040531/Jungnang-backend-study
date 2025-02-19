import {Todo} from "./todo.domain";

export class ApiResponse<T> {
  body: T | null;
  message: string | null;

  private constructor(body: T | null, message: string | null) {
    this.body = body;
    this.message = message;
  }

  static success<T>(body: T): ApiResponse<T> {
    return new ApiResponse(body, null);
  }

  static error<T>(message: string): ApiResponse<T | null> {
    return new ApiResponse(null, message);
  }
}

export class TodoResponse {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;

  constructor(
      title: string,
      description: string,
      done: boolean,
      createdAt: Date,
      lastUpdatedAt: Date
  ) {
    this.title = title;
    this.description = description;
    this.done = done;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
  }

  static from(todo: Todo): TodoResponse {
    return new TodoResponse(
        todo.title,
        todo.description,
        todo.done,
        todo.createdAt,
        todo.lastUpdatedAt)
  }
}

export class TodoRequest {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;

  constructor(
      title: string,
      description: string,
      done: boolean,
      createdAt: Date,
      lastUpdatedAt: Date
  ) {
    this.title = title;
    this.description = description;
    this.done = done;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
  }

  toTodo(id: string): Todo {
    return new Todo(
        id,
        this.title,
        this.description,
        this.done,
        this.createdAt,
        this.lastUpdatedAt
    );
  }
}