import { Person } from './08-classes';


export class Person {


    constructor(
        public name:string,
        private address: string = 'No address'
    ) 
    { }

}

const tony = new Person('tony', 'NY');

export class Hero {
    
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ) {}

}

// export class Hero extends Person{

//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ) {
//         super(realName, 'NY');
        
//     }

// }

const ironman = new Hero('ironman', 40,'tony stark', tony);
console.log(ironman)