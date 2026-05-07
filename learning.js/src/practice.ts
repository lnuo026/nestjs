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

// 显式调用 new Cat() 和 tom.meow()，才有了 meow 输出
//  需要创建一个 Cat 实例
const tom = new Cat();
tom.meow();
