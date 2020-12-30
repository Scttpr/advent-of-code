import { loadInput, exec } from "./common.ts";

const DAY = 8;
const input = await loadInput(DAY);

enum Action {
    NOOP ='nop',
    ACC = 'acc',
    JUMP = 'jmp',
}

interface State {
    index: number;
    value: number;
    indexes: number[];
    hasChanged?: boolean;
}

interface Instruction {
    type: string;
    value: number;
    index: number;
}

const action = (state: State, instruction: Instruction): State => {
    switch (instruction.type) {
        case Action.NOOP:
            state.index += 1;
            break;
        case Action.ACC:
            state.value += instruction.value;
            state.index += 1;
            break;
        case Action.JUMP:
            state.index += instruction.value;
            break;
    }

    state.indexes.push(instruction.index);
    
    return Object.assign({}, state);
}



const convertInstruction = (instruction: Instruction): Instruction => (
    instruction.type === Action.NOOP
        ? { ...instruction, type: Action.JUMP }
        : { ...instruction, type: Action.NOOP }
);

const checkInstruction = (instruction: Instruction): boolean => (
    instruction.type === Action.NOOP || instruction.type === Action.JUMP
);

const formattedInput = input.split('\n').reduce((acc, instruction, index) => {
    const [type, value] = instruction.split(' ');
    acc.push({ type, value: +value, index });

    return acc;
}, [] as Instruction[]);

/*
 * First exercise
 */

const a = (input: Instruction[]): number => {
    let state: State = {
        value: 0,
        index: 0,
        indexes: [],
    };
    
    while (!state.indexes.includes(state.index)) {
        const instruction = input[state.index];
        state = action(state, instruction);
    }

    return state.value;
};

/*
 * Second exercise
 */

const b = (input: Instruction[]): number => {
    let state: State = {
        index: 0,
        value: 0,
        indexes: []
    }

    while (!state.indexes.includes(state.index) && input[state.index]) {
        const instruction = input[state.index];

        if (checkInstruction(instruction)) {
            let localState: State = {
                index: state.index,
                value: state.value,
                indexes: Array.from(state.indexes),
            }
            const localInput = Array.from(input);
            
            localInput[localState.index] = convertInstruction(instruction);

            while(!localState.indexes.includes(localState.index) && localInput[localState.index].type) {
                const localInstruction = localInput[localState.index];
                
                localState = action(localState, localInstruction);
            }

            if (localInput.length - 1 === localState.index) {
                return localState.value;
            }
        }

        state = action(state, instruction);
    }
    
    return state.value;
};

export default () => exec(DAY, () => a(formattedInput), () => b(formattedInput));