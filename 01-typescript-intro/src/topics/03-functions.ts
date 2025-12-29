
function addNumbers(a: number,b: number){
    return a + b;
}

const addNumbersArrow = (a:number, b:number):string => {
    return `${a + b}`;
}

function multiply(fristNumber: number, secondNumber?: number, base: number = 2){
    return fristNumber * base;
}

interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const vico: Character = {
    name: 'vico',
    hp: 50,
    showHp(){
        console.log(`Puntos de vida ${this.hp}`)
    }
}

const healCharacter = (character: Character, amount:number) => {

    character.hp += amount;
}

healCharacter(vico, 10);

vico.showHp();

// const result = addNumbers(1,2);
// const result2 = addNumbersArrow(1,2);
// const multiplyResult = multiply(5)

// console.log({result});
// console.log({result2});
// console.log({multiplyResult})