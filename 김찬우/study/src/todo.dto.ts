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
  id: string;
  title: string;

  constructor(id: string, title: string) {
      this.id = id;
      this.title = title;
  }

  static from(todo: Todo): TodoResponse {
    return new TodoResponse(todo.id, todo.title);
  }
}

export class TodoDetailResponse {
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

  static from(todo: Todo): TodoDetailResponse {
    return new TodoDetailResponse(
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
}