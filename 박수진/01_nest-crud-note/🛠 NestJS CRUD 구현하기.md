#  🛠 **NestJS CRUD 구현하기**

## 1️⃣ **프로젝트 생성 및 기본 설정**

```
npm i -g @nestjs/cli
nest new nest-crud-example
cd nest-crud-example
npm run start
```

## 2️⃣ **모듈, 컨트롤러, 서비스 생성**

NestJS에서는 `nest g` 명령어를 사용하여 자동으로 기본 코드를 생성할 수 있습니다.

```
nest g module todos
nest g controller todos
nest g service todos
```

## 3️⃣ **DTO 생성**

데이터 구조를 정의하는 **Data Transfer Object (DTO)** 파일을 만듭니다.

`src/todos/dto/create-todo.dto.ts`

```
export class CreateTodoDto {
  title: string;
  description?: string;
}
```

`src/todos/dto/update-todo.dto.ts`

```
export class UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

## 4️⃣ **엔티티 생성**

실제 데이터를 표현하는 인터페이스나 클래스를 정의합니다.

`src/todos/entities/todo.entity.ts`

```
export class Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}
```

## 5️⃣ **모듈 생성** (`todos.module.ts`)

```
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
```

## 6️⃣ **앱 모듈 등록** (`app.module.ts`)

```
import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
```

## 7️⃣ **컨트롤러 작성** (`todos.controller.ts`)

```
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(+id);
  }
}
```

## 8️⃣ **서비스 구현** (`todos.service.ts`)

```
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
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) throw new NotFoundException(`Todo with id ${id} not found`);
    this.todos.splice(index, 1);
  }
}
```

* * *

## 🚀 **다음 스텝**

1. **데이터베이스 연동 (TypeORM, Prisma)**
2. **Middleware, Guards, Interceptors 활용**
3. **NestJS를 활용한 대규모 프로젝트 설계**

이제 **NestJS의 기본 흐름과 CRUD 구현**을 확실히 이해했어요!  
더 궁금한 게 있으면 언제든지 물어봐요 😊🔥