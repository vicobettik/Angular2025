import { Product, taxCalculation, tax } from './06-function-destructuring';


const shoppingCart: Product[] = [
    {
        description: 'nokia',
        price: 300.5
    },
    {
        description: 'ipad',
        price: 150
    }
];

const [total, totalTax] = taxCalculation({
    products: shoppingCart,
    tax
});

console.log(`Total:${total}`);
console.log(`Tax:${totalTax}`);