import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type TodoDocument = HydratedDocument<Todo>

@Schema({collection: 'todos', timestamps: true})
export class Todo {
  @Prop({required: true})
  title: string;
  @Prop()
  description: string;
  @Prop({default: false})
  done: boolean;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);