import { TodoPriority } from '../entities/todo.entity';
import { IsString , IsNotEmpty ,IsOptional , IsEnum ,MaxLength} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(225)
  title!: string;
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;
  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;
}
