### 📌 **NestJS Providers 요약**

The [NestJS Providers Guide](https://docs.nestjs.com/providers) explains how **providers** work as fundamental building blocks for managing dependencies and business logic in a NestJS application.

* * *

## **1️⃣ What Are Providers?**

- Providers in NestJS are **services, repositories, or other logic-handling classes** that can be **injected** into other components.
- They are marked with the `@Injectable()` decorator, making them available for **Dependency Injection (DI)**.

* * *

## **2️⃣ Creating a Service (Provider)**

- Generate a service using the CLI:

```
nest generate service users
```

(or `nest g s users` for short)
- Example `users.service.ts`:

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = ['Alice', 'Bob', 'Charlie'];

  findAll(): string[] {
    return this.users;
  }
}
```
- The `@Injectable()` decorator tells NestJS that this class can be injected into other components.

* * *

## **3️⃣ Injecting a Service into a Controller**

- Inject the service into a controller using **constructor injection**:

```
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string[] {
    return this.usersService.findAll();
  }
}
```
- This allows the controller to **delegate logic** to the service.

* * *

## **4️⃣ Registering Providers in a Module**

- All providers (services) must be registered in a module.
- The `@Module()` decorator in `users.module.ts`:

```
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```
- The `providers` array tells NestJS that `UsersService` should be available for **injection**.

* * *

## **5️⃣ Using Custom Providers**

- You can define a provider manually in a module:

```
const customProvider = {
  provide: 'CUSTOM_SERVICE',
  useValue: { message: 'Hello from Custom Provider' },
};

@Module({
  providers: [customProvider],
})
export class AppModule {}
```
- Injecting the custom provider:

```
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SomeService {
  constructor(@Inject('CUSTOM_SERVICE') private readonly customService: any) {}

  getMessage() {
    return this.customService.message;
  }
}
```

* * *

## **6️⃣ Different Types of Providers**

| Type | Example |
| --- | --- |
| **Class-based Provider** | `providers: [UsersService]` |
| **Value-based Provider** | `useValue: { message: 'Hello' }` |
| **Factory-based Provider** | `useFactory: () => new SomeClass()` |
| **Existing Provider (Alias)** | `useExisting: OtherService` |

Example **Factory-based Provider**:

```
@Module({
  providers: [
    {
      provide: 'RANDOM_NUMBER',
      useFactory: () => Math.random(),
    },
  ],
})
export class AppModule {}
```

- Injecting the value:

```
constructor(@Inject('RANDOM_NUMBER') private readonly random: number) {}
```

* * *

### **✅ Summary**

1. **Providers (services) handle business logic** and can be injected into controllers.
2. **Use `@Injectable()`** to mark a class as a provider.
3. **Providers must be registered in a module** (`providers: [UsersService]`).
4. **Custom providers** can be created using `useValue`, `useFactory`, or `useExisting`.

* * *

NestJS uses **Dependency Injection (DI)** to keep applications modular and scalable. 🚀  
Would you like to implement a provider in your NestJS project now? 😊

<br>