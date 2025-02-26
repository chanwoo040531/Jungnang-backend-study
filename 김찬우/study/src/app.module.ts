import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {TodoModule} from "./todo.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27777/nest'),
    TodoModule,
  ],
})
export class AppModule {
}
