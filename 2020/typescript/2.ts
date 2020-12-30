import { loadInput, exec } from './common.ts';

const DAY = 2;
const input = await loadInput(DAY);

const formattedInput = input
    .split('\n')
    .reduce((acc, row): Row[] => {
        const [minMax, rawLetter, word] = row.split(' ');
        
        if (minMax && rawLetter && word) {
            const [min, max] = minMax.split('-');
            const letter = rawLetter[0];
            acc.push({ min: parseInt(min, 10), max: parseInt(max, 10), letter, word });
        }

        return acc;
    }, [] as Row[]);

interface Row {
    min: number,
    max: number,
    letter: string,
    word: string,
}

/*
 * First exercise
 */

const a = (input: Row[]): number => {
    const matches = input.filter(({ min, max, letter, word }) => {
        const chars = word.split('').filter((char) => char === letter);
        return chars.length >= min && chars.length <= max;
    });

    return matches.length
}

/*
 * Second exercise
 */

const b = (input: Row[]): number => {
    const matches = input.filter(({ min, max, letter, word }) => {
        const first = min - 1;
        const last = max - 1;
        return (
            (word[first] === letter && word[last] !== letter)
            || (word[first] !== letter && word[last] === letter)
        )
    });

    return matches.length
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));