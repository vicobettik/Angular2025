
function classDecorator<T extends {new(...args:any[]):{}}>(
    constructor: any
){

    return class extends constructor{
        newProperty = 'New property';
        hello = 'override'
    }

}

@classDecorator
class superClass {
    public myProperty: string = 'Abc123'

    print(){
        console.log('Hola mundo');
    }

}

console.log(superClass);

const myClass = new superClass();
console.log(myClass);