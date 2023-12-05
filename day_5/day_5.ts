import * as fs from 'fs'

function mapRange(targetCat: number, sourceCat: number, rangeLen: number) : Record<number,  number> {
    const mappedRange: Record<number, number> = {};


    for (let i = 0; i < rangeLen; i++) {
        mappedRange[sourceCat+i] = targetCat+i;
    }


    return mappedRange;
}

function readAlmanacSection(allLines: string[], currLine: number) : [number, number[][]] {
    let almanacSection = [];

    let l;
    while (!!(l = allLines[currLine++])) {
        almanacSection.push(l.split(' ').map(s => parseInt(s)));
    }

    return [currLine, almanacSection];
}

function readAlmanac(allLines: string[]) : number {
    let currLine = 0;

    const seeds = allLines[currLine].split(' ').slice(1).map(s => parseInt(s));
    console.log(seeds);

    const sections =
    ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light",
     "light-to-temperature", "temperature-to-humidity", "humidity-to-location"]
        .map((section) => {
            const header = `${section} map:`
            console.log(header);
            while (allLines[currLine++] != header);
            let curSection;
            [currLine, curSection] = readAlmanacSection(allLines, currLine++);
            return curSection;
        });

    let seeds_to_loc = seeds.map((seed) => {
        // LOL
        return sections.reduce((prevInx: number, section: number[][]) => {
            let mapped: number;
            for (const r of section) {
                if (r[1] <= prevInx && prevInx <= r[1]+r[2]) {
                    return (prevInx - r[1]) + r[0];
                }
            }
            return prevInx;
        }, seed);
    });

    console.log(seeds_to_loc);

    return seeds_to_loc.reduce((prevMin, cV) => {
        return Math.min(prevMin, cV);
    }, Infinity);
    
}

/*const allLines =
["seeds: 79 14 55 13",
"",
"seed-to-soil map:",
"50 98 2",
"52 50 48",
"",
"soil-to-fertilizer map:",
"0 15 37",
"37 52 2",
"39 0 15",
"",
"fertilizer-to-water map:",
"49 53 8",
"0 11 42",
"42 0 7",
"57 7 4",
"",
"water-to-light map:",
"88 18 7",
"18 25 70",
"",
"light-to-temperature map:",
"45 77 23",
"81 45 19",
"68 64 13",
"",
"temperature-to-humidity map:",
"0 69 1",
"1 0 69",
"",
"humidity-to-location map:",
"60 56 37",
"56 93 4"];*/

const allLines = fs.readFileSync('input_day_5.txt', 'utf-8').split('\n');
allLines.pop();
console.log(readAlmanac(allLines));
