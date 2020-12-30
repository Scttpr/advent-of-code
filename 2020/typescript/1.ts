import { loadInput, exec, multiply } from './common.ts';

const DAY = 1;
const input: string = await loadInput(DAY);

const REF_NUMBER = 2020;
const formattedInput = input.split('\n').map(date => parseInt(date, 10));

/*
 * First exercise
 */

const findMatches = ([head, ...tail]: number[], target: number): number[] | null => {
    if (head) {
        const potentialMatch = target - head;
        if (tail.includes(potentialMatch)) {
            return [head, potentialMatch];
        }

        return findMatches(tail, target);
    }

    return null;
}

const a = (list: number [], target: number): number => {
    const matches = findMatches(list, target);

    if (matches === null) {
        throw new Error('no match');
    }

    return multiply(matches);
}

/*
 * Second exercise
 * @todo find a recursive solution for n iterations
 */

const b = (input: number[], ref: number): number => {
    const matches = input.filter((date) => input.find((secondDate) => {
        if (date !== secondDate) {
            return input.find((thirdDate) => {
                if (date !== thirdDate && secondDate !== thirdDate) {
                    return date + secondDate + thirdDate === ref;
                }
            });
        }
    }));

    return multiply(matches);
}

export default () => exec(
    DAY,
    () => a(formattedInput, REF_NUMBER),
    () => b(formattedInput, REF_NUMBER),
);