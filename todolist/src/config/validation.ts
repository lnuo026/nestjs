import * as Joi from 'joi';

// 用 @nestjs/config + Joi 做校验，validation.ts 是“必填配置清单”。
// joi 是一个数据校验库，专门用来“验证输入是否符合规则”。
// 在这里它用来校验环境变量
// 把 MONGODB_URI 写进去的作用是：
// 防止忘记配置 ，明确依赖：一眼看出服务必须有数据库连接，不会在生产环境“静默失败”。
export const validationSchema = Joi.object({
     NODE_ENV: Joi.string()
     .valid("development", "production", "test")
     .default("development"),
     PORT: Joi.number().default(3000), 
     MONGODB_URI: Joi.string()
     .uri({ scheme: ['mongodb', 'mongodb+srv' ]}) 
     .required(),
});