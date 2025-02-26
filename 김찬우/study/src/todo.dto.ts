import {TodoDocument} from "./todo.domain";

export class ApiResponse<out T> {
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

  private constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  static from(todo: TodoDocument): TodoResponse {
    return new TodoResponse(todo.id, todo.title);
  }
}

export class TodoDetailResponse {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;

  private constructor(
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

  static from(todo: TodoDocument): TodoDetailResponse {
    return new TodoDetailResponse(
        todo.title,
        todo.description,
        todo.done,
        todo.createdAt,
        todo.updatedAt,
    )
  }
}

export class TodoRequest {
  title: string;
  description: string;
  done: boolean;
}