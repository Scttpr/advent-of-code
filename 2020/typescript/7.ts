import { loadInput, exec } from "./common.ts";

const DAY = 7;
const input = await loadInput(DAY);

type Bag = { quantity: number, label: string };

interface Line {
    label: string;
    children: Bag[];
}

const formatRow = (rawLine: string): Line => rawLine.split(/bag(s)?|contain|,/g)
    .filter((slice) => slice?.length > 2)
    .reduce((line, slice, index) => {
        if (index === 0) {
            line.label = slice.trim();
        } else {
            const [qty, ...rest] = slice.trim().split(' ');
            line.children.push({
                quantity: +qty,
                label: rest.join(' ')
            });
        }

        return line;
    }, { children: [], label: '' } as Line)

const formattedInput = input.split('\n').map(formatRow);

const findBag = (label: string, bags: Line[]): Line | void => {
    const bag = bags.find((bag) => bag.label === label);
    
    if (!bag) {
        // Silent error
    } else {
        return bag;
    }
}

/*
 * First exercice
 */

const containsBag = (input: Line[], possibleBags: string[], refBag: string): string[] => input.reduce((matchedBags, line) => {
    const { label, children } = line;
    const includesRefBag = children.find(({ label }) => label === refBag); 

    if (includesRefBag && !matchedBags.includes(label)) {
        matchedBags.push(label);
        matchedBags = containsBag(input, matchedBags, label);
    }

    return matchedBags;
}, Array.from(possibleBags));

const a = (input: Line[]) => {
    const myBag = 'shiny gold';
    const possibleBags = containsBag(input, [], myBag);
   
    return possibleBags.length;
}

/*
 * Second exercice
 */

const sum = (line: Line, bags: Line[]): number => line.children.reduce((total, line) => {
    const bag = findBag(line.label, bags);
    if (bag) {
        total += line.quantity * sum(bag, bags);
    }

    return total;
}, 1);

const countChildren = (label: string, bags: Line[]): number => {
    const root = findBag(label, bags);

    let total = 0;
    if (root) {
        total = sum(root, bags); 
    }

    return total - 1;
}

const b = (input: Line[]): number => {
    const myBag = 'shiny gold';
    return countChildren(myBag, input);
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));
