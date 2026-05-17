// 从 nest-winston 拿工具函数。这里主要用它的 format.nestLike() 来输出类似 Nest 原生日志风格。
import { utilities as nestWinstonModuleUtilities } from "nest-winston";
// 把 winston 整个库导入成对象 winston。后面会用它创建 transports 和 format
import * as winston from "winston";

// timestamp()：每条日志带时间
// ms()：记录耗时
// nestLike()：让日志格式更像 Nest 默认风格（便于阅读）
export const winstonConfig = {
     level: "info",
     transports: [
          new winston.transport.Console({
               format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    nestWinstonModuleUtilities.format.nestLike("Todolist", {
                         prettyPrint:true,
                    })
               ),
          }),
     ],
};