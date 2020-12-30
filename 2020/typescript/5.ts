import { loadInput, exec } from './common.ts';

const DAY = 5;
const input = await loadInput(DAY);

const formattedInput = input.split('\n').filter(Boolean);

const genericValidator = (array: string[]): (char: string) => boolean => (char) => array.includes(char);

const isUpper = genericValidator(['B', 'R']);
const isLower = genericValidator(['F', 'L']);
const isRow = genericValidator(['B', 'F']);
const isColumn = genericValidator(['L', 'R']);

const getNewRange = (char: string, range: [number, number]): [number, number] => {
    const half = Math.ceil((range[1] - range[0]) / 2);
    
    if (isUpper(char)) {
        range[0] += half;
    } else if (isLower(char)) {
        range[1] -= half;
    }

    return range;
}

const findPosition = (pass: string): { row: number, column: number } => {    
    let rowRange: [number, number] = [0, 127];
    let columnRange: [number, number] = [0, 7];

    pass.split('').forEach((char) => {
        if (isRow(char)) {
            rowRange = getNewRange(char, rowRange);            
        } else if (isColumn(char)) {
            columnRange = getNewRange(char, columnRange);
        }
    });

    if (rowRange[0] !== rowRange[1] || columnRange[0] !== columnRange[1]) {
        throw new Error('Ranges do not match');
    }

    return { row: rowRange[0], column: columnRange[0] };
}

export const getSeatId = (row: number, column: number): number => row * 8 + column;

/*
 * First exercise
 */

const a = (input: string[]): number => input.reduce((result, pass) => {
    const { row, column } = findPosition(pass);
    const seatId = getSeatId(row, column);

    if (!result || seatId > result) {
        return seatId;
    }

    return result;
}, 0);

/*
 * Second exercise
 */

const b = (input: string[]): number => {
    const sortedIDs = input.reduce((result, pass) => {
        const { row, column } = findPosition(pass);
        const seatId = getSeatId(row, column);

        result.push(seatId);

        return result;
    }, [] as number[]).sort();

    const mySeat = sortedIDs.find((ID, index) => sortedIDs[index + 1] - ID === 2);

    if (!mySeat) {
        throw new Error('No seat found');
    }

    return mySeat + 1;
};

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));