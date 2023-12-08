import * as fs from 'fs'

function createMap(lines: string[]) : Record<string, [string, string]> {
    const r: Record<string, [string, string]> = {};

    lines.forEach((l) => {
        const [key, destinations] = l.split('=');
        const [left, right] = destinations.split(',');

        r[key.trim()] = [left.trim().slice(1,), right.trim().slice(0, 3)]
    });

    return r;
}

function findWay(allLines: string[]) : number {
    const insts = allLines[0];
    let inst_inx = 0;
    const map = createMap(allLines.slice(2));

    let s = "AAA";

    let steps = 0;
    while (s != "ZZZ") {
        steps++;
        let i =  insts[inst_inx] === 'L' ? 0 : 1;
        s = map[s][i];
        inst_inx = (inst_inx + 1) % insts.length;
    }

    return steps;
}


/*
const lines: string[] = 
[
"LLR",
"",
"AAA = (BBB, BBB)",
"BBB = (AAA, ZZZ)",
"ZZZ = (ZZZ, ZZZ",
];
*/
/*
[
"RL",
"",
"AAA = (BBB, CCC)",
"BBB = (DDD, EEE)",
"CCC = (ZZZ, GGG)",
"DDD = (DDD, DDD)",
"EEE = (EEE, EEE)",
"GGG = (GGG, GGG)",
"ZZZ = (ZZZ, ZZZ;)"]
*/

const lines = fs.readFileSync('input_day_8.txt', 'utf-8').split('\n');
lines.pop();

console.log(findWay(lines));
