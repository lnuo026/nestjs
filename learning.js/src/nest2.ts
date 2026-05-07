
//定义一个装饰器    
function MyLog(target:any, ){
    console.log('被定义的类',target.name)
}

//使用装饰器
@MyLog
class Animal{
    constructor(private name:string){}
}

class Cat{
    constructor(
        private readonly name: string,
        public readonly age: number,
    ){}
    
    introduce(){
        console.log(`my name is ${this.name}, and  I am ${this.age} this year`)
        
    }
}

    const tom = new Cat('Tom' ,3);
    tom.introduce();