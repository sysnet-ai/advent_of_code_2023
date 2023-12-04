import * as fs from 'fs'



function splitScratchLine(scratchline: string) : string[] {
    return scratchline.replace(/Card\s+\d+:/, "").split("|");
}

function findWinners(line: string) : string[] {
    const [winning, having] = splitScratchLine(line);

    const winNums = winning.trim().split(/\s+/);
    const haveNums = having.trim().split(/\s+/);

    const winners: Set<string> = new Set<string>();

    winNums.forEach((n) => winners.add(n));

    const have = haveNums.filter((n) => winners.has(n));

    console.log(`From ${having} the winners are ${have} in ${winNums}`);

    return have;
}



/*
const scratchies =
["Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
"Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
"Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
"Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
"Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
"Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"];
*/

const scratchies = fs.readFileSync('input_day_4.txt', 'utf-8').split('\n');
scratchies.pop();
console.log(
    scratchies.map((line) => findWinners(line)
        .reduce((prevV, n) =>{
            // n is ignored

            if (prevV == 0) { // special case
                return 1;
            }

            return prevV*2;
        }, 0))
    .reduce((prevV, currV) => {
        return prevV+currV;
    }, 0));
