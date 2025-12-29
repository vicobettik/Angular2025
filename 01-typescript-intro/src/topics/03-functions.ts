
function addNumbers(a: number,b: number){
    return a + b;
}

const addNumbersArrow = (a:number, b:number):string => {
    return `${a + b}`;
} 

const result = addNumbers(1,2);
const result2 = addNumbersArrow(1,2);

console.log({result});
console.log({result2});