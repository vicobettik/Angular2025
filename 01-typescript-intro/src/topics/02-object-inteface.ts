
const skills: string[] = ['bash','counter','heal'];

interface Character {
    name: string;
    hp: number;
    skills: string[];
    homeTown?: string
}

const vico: Character = {
    name: 'vicobettik',
    hp: 100,
    skills: ['bash','counter'],
    homeTown: 'Rivendel'
};

console.table(vico)