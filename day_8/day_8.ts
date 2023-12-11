import * as fs from 'fs'

// Part Two: Return the map and also all starting locations
function createMap(lines: string[]) : [Record<string, [string, string]>, string[]]  {
    const r: Record<string, [string, string]> = {};
    const allStarts: string[] = [];

    lines.forEach((l) => {
        const [key, destinations] = l.split('=');
        const [left, right] = destinations.split(',');

        let k = key.trim();

        r[k] = [left.trim().slice(1,), right.trim().slice(0, 3)]

        if (k[2] === 'A') {
            allStarts.push(k);
        }
    });

    return [r, allStarts];
}

function findWay(allLines: string[]) : number {
    const insts = allLines[0];
    let inst_inx = 0;
    let [map, allStarts] = createMap(allLines.slice(2));
    let steps = 0;

    /* Part One
    let s = "AAA";
    while (s != "ZZZ") {
        steps++;
        let i =  insts[inst_inx] === 'L' ? 0 : 1;
        s = map[s][i];
        inst_inx = (inst_inx + 1) % insts.length;
    }
    */
    const totalStarts = allStarts.length;
    let arrived = 0;
    console.log(totalStarts);
    while (arrived != totalStarts) {
        steps++;
        let i =  insts[inst_inx] === 'L' ? 0 : 1;
        arrived = 0;

        allStarts = allStarts.map(s => {
            s = map[s][i];

            if (s[2] == 'Z') { arrived++; }

            return s;    
        });

        if (arrived > 0)
            console.log(">> ", arrived); 

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
/*
const lines = [
"LR",
"",
"11A = (11B, XXX)",
"11B = (XXX, 11Z)",
"11Z = (11B, XXX)",
"22A = (22B, XXX)",
"22B = (22C, 22C)",
"22C = (22Z, 22Z)",
"22Z = (22B, 22B)",
"XXX = (XXX, XXX)"
]
*/

const lines = fs.readFileSync('input_day_8.txt', 'utf-8').split('\n');
lines.pop();

console.log(findWay(lines));
