type exercise = () => string | number | undefined;

export const exec = (day: number, a: exercise, b: exercise): void => {
    console.log('\n');
    console.info(`%cDay ${day} :`, 'color: green');
    console.time('Total');

    console.time('a');
    console.info('%cStarting A exercise...', 'color: yellow');
    console.log('Result :', a());
    console.timeEnd('a');

    console.time('b');
    console.info('\n%cStarting B exercise...', 'color: yellow');
    console.log('Result :', b());
    console.timeEnd('b');

    console.timeEnd('Total');
}

export const multiply = ([head, ...tail]: number[]): number => (
    head ? head * multiply(tail) : 1
);

export const sum = ([head, ...tail]: number[]): number => (
    head ? head + sum(tail) : 0
);

export const loadInput = (day: number): Promise<string> => {
    const baseDir = Deno.cwd().match(/.*2020/);

    if (baseDir === null) {
        throw new Error('Base directory does not exist');
    }

	const path = `${baseDir}/input/${day}.txt`; 
	
	return Deno.readTextFile(path);
}

