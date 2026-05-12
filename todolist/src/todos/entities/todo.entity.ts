// Entity 不需要校验装饰器——它是内部数据结构，不接收外部输入
export class Todo {

  // ! 非空断言"或"明确赋值断言,保证将来会被赋值
  id!: string;
  title!: string;
  description?: string;
  done!: boolean;
  priority!: TodoPriority;
  createdAt!: Date;
  updatedAt!: Date;
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
