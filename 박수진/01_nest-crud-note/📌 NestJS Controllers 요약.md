# 📌 **NestJS Controllers 요약**

The [NestJS Controllers Guide](https://docs.nestjs.com/controllers) explains how to handle HTTP requests and define endpoints in a structured way.

* * *

## **1️⃣ What Are Controllers?**

- Controllers in NestJS handle **incoming HTTP requests** and return **responses**.
- They act as **entry points** for processing client requests.

* * *

## **2️⃣ Creating a Basic Controller**

- Generate a controller using the CLI:

```shell
nest generate controller users
```

(or `nest g co users` for short)
- Example `users.controller.ts`:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
```
- The `@Controller('users')` decorator sets the **route prefix** (`/users`).
- The `@Get()` decorator maps GET requests to the `findAll()` method.

* * *

## **3️⃣ Handling Different HTTP Methods**

NestJS provides decorators for different request types:

| HTTP Method | Decorator | Example |
| --- | --- | --- |
| **GET** | `@Get()` | `@Get('profile')` → `/users/profile` |
| **POST** | `@Post()` | `@Post()` → `/users` |
| **PUT** | `@Put()` | `@Put(':id')` → `/users/:id` |
| **DELETE** | `@Delete()` | `@Delete(':id')` → `/users/:id` |
| **PATCH** | `@Patch()` | `@Patch(':id')` → `/users/:id` |

- Example:

```typescript
@Controller('users')
export class UsersController {
  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates user #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes user #${id}`;
  }
}
```

* * *

## **4️⃣ Handling Request Parameters**

### **(1) Route Parameters**

- Use `@Param()` to extract route parameters.

```
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns user #${id}`;
}
```
    - Accessing `/users/5` → Returns `"This action returns user #5"`

### **(2) Query Parameters**

- Use `@Query()` to get query string parameters.

```
@Get()
findAll(@Query('name') name: string): string {
  return `This action returns users with name: ${name}`;
}
```
    - Accessing `/users?name=John` → Returns `"This action returns users with name: John"`

* * *

## **5️⃣ Handling Request Body (DTO)**

- Use `@Body()` to extract JSON request data.
- Example:

```
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: any): string {
    return `This action creates a new user: ${JSON.stringify(createUserDto)}`;
  }
}
```
    - Sending a POST request with:

```
{ "name": "John", "age": 25 }
```
    - Response: `"This action creates a new user: { name: 'John', age: 25 }"`

* * *

## **6️⃣ Organizing with Dependency Injection**

- Controllers should delegate logic to **services**.
- Inject a service into a controller using **constructor injection**:

```
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string {
    return this.usersService.getUsers();
  }
}
```
- The corresponding service:

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    return 'This action returns all users from service';
  }
}
```

* * *

### **✅ Summary**

1. **Controllers manage HTTP requests** using decorators like `@Get()`, `@Post()`, etc.
2. **Route parameters (`@Param()`) and query parameters (`@Query()`)** allow dynamic inputs.
3. **Request body (`@Body()`)** handles JSON data.
4. **Dependency injection** improves modularity by delegating logic to services.

* * *

This is the foundation of building REST APIs in NestJS. 🚀  
Would you like to move forward with implementing a CRUD API? 😊

<br>