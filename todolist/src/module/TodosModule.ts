import { Module} from '@nestjs/common';
import { TodosController } from 'src/todos/controller/todo.controller';
import { TodosService } from 'src/todos/todos.service';

@Module({
     controllers: [TodosController],
     providers: [TodosService],
})

export class TodosModule{}