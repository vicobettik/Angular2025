
export interface Passenger{
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'victor'
};

const passenger2: Passenger = {
    name: 'Sofia',
    children: [
        'sofia',
        'melissa'
    ]
}

const returnChildrenNumber = (passenger: Passenger): number => {

    if (!passenger.children) {
        return 0;
    }

    // const howManyChildren = passenger.children?.length || 0;
    const howManyChildren = passenger.children!.length;
    return howManyChildren;
}

console.log(returnChildrenNumber(passenger1));
console.log(returnChildrenNumber(passenger2));