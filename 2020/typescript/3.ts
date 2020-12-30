import { loadInput, exec, multiply } from './common.ts';

const DAY = 3;
const input = await loadInput(DAY);

const formattedInput = input.split('\n').filter(Boolean);

interface Slope {
    x: number;
    y: number;
}

const move = (x: number, slope: number): number => x += slope;

export const treesEncountered = (input: string[], { x, y }: Slope): number => {
    let positionX = 0;
    let positionY = 0;

    const trees = input.filter((row, index) => {
        if (positionY === index) {
            const currentPosition = positionX;
            positionX = move(positionX, x);
            positionY = move(positionY, y);
            return row.split('')[currentPosition % row.length] === '#';
        }
        return false;
    });
    
    return trees.length;
}

/*
 * First exercise
 */

const a = (input: string[]): number => treesEncountered(input, { x: 3, y: 1 })

/*
 * Second exercise
 */

const b = (input: string[]): number => {
    const slopes = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ];

    const totalTreesEncountered = slopes.map((slope) => treesEncountered(input, slope));
    
    return multiply(totalTreesEncountered);
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));