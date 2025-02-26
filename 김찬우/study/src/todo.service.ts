import {Injectable, NotFoundException} from '@nestjs/common';
import {Todo, TodoDocument} from "./todo.domain";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {TodoRequest} from "./todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {
  }

  async save(request: TodoRequest): Promise<TodoDocument> {
    const newTodo = new this.todoModel(request);
    return newTodo.save();
  }

  async getTodo(id: string): Promise<TodoDocument> {
    return await this.todoModel.findById(id).exec()
        ?? this.throwNotFoundException("Todo not found");
  }

  async getAll(): Promise<TodoDocument[]> {
    return this.todoModel.find().exec();
  }

  async updateTodo(id: string, request: TodoRequest): Promise<TodoDocument> {
    return await this.todoModel
            .findByIdAndUpdate(id, request, {new: true})
            .exec()
        ?? this.throwNotFoundException("Todo not found");
  }

  async deleteTodo(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec()
  }

  private throwNotFoundException(message: string): never {
    throw new NotFoundException(message);
  }
}
