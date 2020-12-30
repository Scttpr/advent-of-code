import { loadInput, exec } from './common.ts';

const DAY = 6;
const input = await loadInput(DAY);

const formattedInput = input.split('\n\n').filter(Boolean).map((row) => row.split('\n').filter(Boolean));

const countSetQuestions = (input: string[][], process: (set: string[]) => string[]): number => input.reduce((result, set) => {
    const setAnsweredQuestions = process(set);
    return result += setAnsweredQuestions.length
}, 0);

/*
 * First exercise
 */

 const a = (input: string[][]): number => {
    const process = (set: string[]): string[] => set.reduce((answeredQuestions, person) => {        
        const personQuestions = person.split('');

        const questionsToAdd = personQuestions.filter((question) => !answeredQuestions.includes(question));
    
        return answeredQuestions.concat(questionsToAdd);
    }, [] as string[]);

    return countSetQuestions(input, process);
}

/*
 * Second exercise
 */

const b = (input: string[][]): number => {
    const process = (set: string[]): string[] => set.reduce((answeredQuestions, person, index) => {
        const personQuestions = person.split('');

        if (index === 0) {     
            return personQuestions;
        }
        
        return answeredQuestions.filter((question, i) => personQuestions.includes(question))
    }, [] as string[]);

    return countSetQuestions(input, process);
}

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));