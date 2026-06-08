import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';

// NestJS 依赖注入系统里，每个 Provider 有一个 token（令牌） 作为唯一标识。
// Mongoose Model 的 token 是一个特殊字符串，getModelToken('Todo') 就是生成这个字符串。
// 你在 beforeEach 里用它告诉测试模块："当有人需要 Todo 的 Model 时，给他这个假的 {}"。
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';

describe('TodoService', () => {
     let service: TodosService;

     beforeEach(async ()=> {
          const module = await Test.createTestingModule({
               providers: [
                    TodosService,
                    {
                         provide:getModelToken(Todo.name),
                         useValue: {},
                    },
                         ],
          }).compile();

          service = module.get<TodosService>(TodosService);
     });

     it('should be defined', () => {
          expect(service).toBeDefined();
     });
});