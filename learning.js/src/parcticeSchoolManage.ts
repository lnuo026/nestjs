import 'reflect-metadata'
const labelClass = new Map();

function Subject(name: string){
     return function(target: any ,methodName: string ,descriptor: any ){
          labelClass.set(target,{target:name , })
     }
}

function Class(name: string){
     return function(target:any){
          labelClass.set(target,{target:name})
}
}


