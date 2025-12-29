interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: 'nokia',
    price: 150.0
}

const iPhone: Product = {
    description: 'iphone air',
    price: 200.2
}

interface TaxCalculationOptions {
    tax: number;
    products: Product[]
}

function taxCalculation(options: TaxCalculationOptions): [number,number]{

    let total = 0;

    const { products } = options;

    products.forEach(({price}) => {
        total += price;
    });

    return [total, total * options.tax];

}

const shoppingCart = [phone, iPhone];
const tax = 0.15;

const [total, totalTax] = taxCalculation({
    products: shoppingCart,
    tax
});

console.log(`Total:${total}`);
console.log(`Tax:${totalTax}`);