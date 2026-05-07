import 'reflect-metadata';

// 被调用函数 
function MyDecorator(target: any){
    console.log('装饰器被调用了')
    console.log('target name' , target.name)
}

// define类时，装饰器被自动调用
@MyDecorator
class Cat{
    meow(){   //只是定义了一个方法，并没有调用
        console.log('meow')
    }
}

console.log('类定义的时候就已经发生了装饰器的调用')
console.log('目前没有 new Cat()，所以装饰器的调用和实例化无关')



// ==========模拟 Nest 启动：扫描所有类的标签信息，自动注册路由=============
console.log('==========模拟 Nest 启动：扫描所有类的标签信息，自动注册路由=============');
const labelBook = new Map();
// 提前写函数（装饰器）
function Controller(path: string){
    return function(target: any){
        labelBook.set(target,{path: path});
        console.log(`给${target.name} 贴标签: path=${path}`);
    };
}

// 给三个类分别贴标签
@Controller('users')
class UsersController{}

@Controller('products')
class ProductsController{}

@Controller('orders')
class OrdersController{}

// 显式调用 new Cat() 和 tom.meow()，才有了 meow 输出
//  需要创建一个 Cat 实例
const tom = new Cat();
tom.meow();


console.log('扫描所有的类的标签信息');
console.log('定义controller装饰器，给类贴标签');

labelBook.forEach((label ,ClassRef) => {
    console.log(`发现类${ClassRef.name} , 路径是 /${label.path}`);
    console.log(`自动注册路由: GET ${label.path} , ${ClassRef.name}`);
});