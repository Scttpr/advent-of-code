import { loadInput, exec, sum } from "./common.ts";

const DAY = 9;
const input = await loadInput(DAY);

const formattedInput = input.split("\n").map((number) => +number);

const listPreviousNumbers = (list: number[], index: number, range: number): number[] => {
    const start = index - range;
    return list.slice(start, index);
}

const isSumOfPreviousNumbers = (previous: number[], target: number): boolean => previous.reduce((result: boolean, number) => {
    if (result) {
        return result;
    }

    return previous.includes(target - number);
}, false);

/*
 * First exercise
 */

const a = (input: number[]): number | undefined => input.find((number, index) => {
    const RANGE = 25;

    if (index >= RANGE) {
        const previous = listPreviousNumbers(input, index, RANGE);
        return !isSumOfPreviousNumbers(previous, number);
    }

    return false;
});

/*
 * Second exercise
 */

const b = (input: number[]): number => {
    const invalidNumber = a(formattedInput);

    if (!invalidNumber) {
        throw new Error('No invalid number in list');
    }

    const invalidNumberIndex = input.findIndex((number) => number === invalidNumber);
    const slicedInput = input.slice(0, invalidNumberIndex);

    const findRange = (list: number[], index: number, range: number[]): number[] => {
        const current = list[index];
        const rangeValue = sum(range);

        if (rangeValue === invalidNumber) {
            return range;
        } else if (rangeValue > invalidNumber) {
            const toRemove = range.reduce((updatedRange, number) => {
                const updatedRangeValue = sum(updatedRange);
                const newRangeValue = rangeValue - updatedRangeValue;

                if (newRangeValue >= invalidNumber) {
                    updatedRange.push(number);
                }

                return updatedRange;
            }, [] as number[]);

            return findRange(list, index + 1, [...range.slice(toRemove.length), current]);
        } else {
            return findRange(list, index + 1, [...range, current])
        }
    }

    const range = findRange(slicedInput, 0, []);

    return Math.max(...range) + Math.min(...range);
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput))