import * as Joi from 'joi';

// joi 是一个数据校验库，专门用来“验证输入是否符合规则”。
// 在这里它用来校验环境变量
export const validationSchema = Joi.object({
     NODE_ENV: Joi.string()
     .valid("development", "production", "test")
     .default("development"),
     PORT: Joi.number().default(3000),  
});