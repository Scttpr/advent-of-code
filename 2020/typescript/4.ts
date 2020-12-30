import { loadInput, exec } from './common.ts';

const DAY = 4;
const input = await loadInput(DAY);

const formattedInput = input.split('\n\n');

const getKeyValuePairs = (row: string): { [key: string]: string } => row
.split(/[\n ]/)
.reduce((acc, slice) => {
    const [key, value] = slice.split(':');    

    if (!key || !value) {
        return acc;
    }

    return { ...acc, [key]: value };
}, {} as { [key: string]: string });

const requiredFields = [
    { key: 'iyr', rule: (value: string): boolean => parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020 },
    { key: 'byr', rule: (value: string): boolean => parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002 },
    { key: 'eyr', rule: (value: string): boolean => parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030 },
    { key: 'hgt', rule: (value: string): boolean => {
        const splitValue = value.match(/[a-z]+|[0-9]+/g);

        if (splitValue !== null) {
            const unit = splitValue[1];
            const val = parseInt(splitValue[0], 10);

            if (unit === 'cm') {
                return val >= 150 && val <= 193;
            }
    
            if (unit === 'in') {
                return val >= 59 && val <= 76;
            }
        }
       
        return false;
    } },
    { key: 'hcl', rule: (value: string): boolean => !!value.match(/#[a-f0-9]{6}/) },
    { key: 'ecl', rule: (value: string): boolean => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value) },
    { key: 'pid', rule: (value: string): boolean => !!value.match(/^[0-9]{9}$/) },
];

/*
 * First exercise
 */

const a = (input: string[]): number => {
    const correctPassports = input.filter((row) => {        
        const formattedRow = getKeyValuePairs(row);                     
        return  requiredFields.every(({ key }) => Object.keys(formattedRow).includes(key));
    });

    return correctPassports.length;
}

/*
 * Second exercise
 */

const b = (input: string[]): number => {
    const correctPassports = input.filter((row) => {        
        const formattedRow = getKeyValuePairs(row);        
                          
        return  requiredFields.every(({ key, rule }): boolean => {
            const tmp = formattedRow[key];
            if (!tmp) {
                return false
            }
                     
            return rule(tmp);
        });
    });    
    
    return correctPassports.length
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));

