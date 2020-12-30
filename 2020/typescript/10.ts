import { loadInput, exec } from "./common.ts";

const DAY = 10;
const input = await loadInput(DAY);

const formattedInput = input.split('\n').map((number) => +number).sort((a, b) => a <= b ? -1 : 1);

const getDifference = (value: number, next: number): number => next - value;

interface Differences {
    one: number;
    two: number;
    three: number;
}

/*
 * First exercise
 */

const a = (input: number[]): number => {
    const countDifferences = ([head, ...tail]: number[], differences: Differences): Differences => {
        const difference = getDifference(head, tail[0]);
        console.log(input.length);
        
        switch (difference) {
            case 1:
                return countDifferences(tail, { ...differences, one: differences.one += 1 });
            case 3:
                return countDifferences(tail, { ...differences, three: differences.three += 1 });
            default:
                return { ...differences, three: differences.three += 1 };
        }
    }

    const { one, three } = countDifferences(input, { one: 0, two: 0, three: 0 });
    console.log(one, three);
     
    return one * three;
}

/*
 * Second exercise
 */

const b = (input: number[]): number => {
    console.log('B');
    return 0;
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));