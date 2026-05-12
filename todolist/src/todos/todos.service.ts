import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Todo , TodoPriority } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodosService{
     private todos: Todo[] = [];

     findAll():Todo[]{
          return this.todos;
     }

     findOne(id: string):Todo{
          const todo =  this.todos.find((t) => t.id === id);
          if(!todo){
               throw new NotFoundException(`Todo with id ${id} not find`)               
          }
          return todo;
     }

     create(dto: CreateTodoDto): Todo{
          const now = new Date();
          const newTodo: Todo = {
               id: randomUUID(),
               title: dto.title,
               description: dto.description,
               done: false,
               priority: dto.priority ?? TodoPriority.MEDIUM,
               createdAt: now,
               updatedAt: now,
          };
          this.todos.push(newTodo);
          return newTodo;
     }

     update(id: string ,dto:UpdateTodoDto):Todo{
          const todo = this.findOne(id);
          // Object.assign 把源对象的所有属性 复制到 目标对象 中修改目标对象本身，返回修改后的目标对象
          // 如果源对象有相同的属性名，会覆盖目标对象的值
          // 如果目标对象没有该属性，会添加这个属性
          Object.assign(todo, dto,{updatedAt: new Date()});
          return todo;
     }

     // 返回值包含两个信息：deleted 是否删除成功 和 id
     // deleted 这个属性必须存在，且必须是 true
     // id 这个属性必须存在，且必须是字符串
     remove(id: string):{deleted: true ;id:string}{
          const index = this.todos.findIndex((t) => t.id === id);
          if(index === -1){
               throw new NotFoundException(`Todo with id ${id} not find`)
          }
          // array.splice(开始位置, 删除个数, 要添加的元素);
          this.todos.splice(index,1);
          return{ deleted: true ,id};
     }
}