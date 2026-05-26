import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import {  Response } from "express";
import { AuthService } from "./auth.service";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { Public } from "src/common/decorators/public.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { UserDocument } from "../user/schemas/user.schema";

// 这个 Controller 处理所有 /auth/* 路由。
@Controller('auth')
export class AuthController {
     constructor(private readonly authService: AuthService){}

     //Public() — 标记为公开路由，绕过全局 JwtAuthGuard（没登录的用户才能来这里）
     // @UseGuards(GoogleAuthGuard) — 使用 Google Guard，它会把用户重定向到 Google 授权页
     // 方法体是空的，因为跳转逻辑完全由 GoogleAuthGuard 接管，Controller 不需要做任何事
     @Public() // 这个路由不需要 JWT 验证，任何人都可以访问
     @UseGuards( GoogleAuthGuard) // 这个路由需要 Google 验证，访问时会自动触发 GoogleAuthGuard
     @Get('google') // GET /auth/google
     googleAuth() {}


     // Google 授权完成后跳回这里：
     // @CurrentUser() — 取出 google.strategy.ts 放进 req.user 的用户对象
     // @Res({ passthrough: true }) — 注入 Express 的 res 对象，用来写 Cookie。
     // passthrough: true 是关键：告诉 NestJS "我只是要用 res 写 Cookie，响应数据还是交给你处理"。
     // 不加这个，NestJS 会把响应控制权完全交给你，拦截器和异常过滤器都失效
     @Public()
     @UseGuards( GoogleAuthGuard)
     @Get('google/callback') // GET /auth/google/callback
     googleCallback(
          @CurrentUser() user: UserDocument,
          @Res( {passthrough: true}) res: Response,
     ){
          return this.authService.login(user, res);
     }


     // 退出登录，清除 Cookie，返回提示信息
     @Public()
     @Get('logout')
     logout(@Res({passthrough: true}) res: Response){
          this.authService.logout(res);
          return { message: 'logged out' };
     }
};