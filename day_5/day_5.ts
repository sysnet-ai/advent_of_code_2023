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

    return [currLine, almanacSection.sort((a,b) => a[1] - b[1])];
}

function rangeIntoRanges(inputRange: number[], section: number[][]) : number[][] {
    const [rangeStart, rangeEnd] = inputRange;
    const rangeLen = rangeEnd - rangeStart;
    for (let i = 0; i < section.length; i++ ) {
        const r  = section[i];
        if (r[1] <= rangeEnd && rangeStart <= r[1]+r[2]) {

            console.log("Testing  ", inputRange, " against ", r);
            // This indicates overlap - BTW F*ck you Valve
            // There are 4 types of overlap:
            // Perfect: The inputRange fits in the section Range.
            // LeftTail & RightTail - Which means the inputRange has some tail on either
            // side of the section range
            // The worst: Both tails
            //
            if (rangeStart < r[1] && r[1] + r[2] < rangeEnd) {
                // The worst :(
                console.log("The worst :(");
                return [ [rangeStart, r[1]-1], [r[0], r[0] + r[2] - 1], ...rangeIntoRanges([r[1]+r[2], rangeEnd], section.slice(i+1))];

            } else if (r[1] + r[2] < rangeEnd) {
                // right tail
                console.log("Right tail"); 
                return [ [ (rangeStart - r[1]) + r[0], r[0] + r[2] - 1], ...rangeIntoRanges([r[1]+r[2], rangeEnd], section.slice(i+1))];
            } else if (rangeStart < r[1]) {
                // left tail
                console.log("left tail"); 
                return [ [rangeStart, r[1]-1], [r[0], (rangeEnd - r[1]) + r[0]] ];
            } else {
                // Perfect fit
                console.log("Perfect :)");
                return [ [(rangeStart) - r[1] + r[0], (rangeEnd - r[1]) +  r[0]] ]
            }
        }
        // no overlap with this region, keep going
    }

    // No overlaps - return the input range 
    return [inputRange];
}

function readAlmanac(allLines: string[]) : number {
    let currLine = 0;

    let seeds = allLines[currLine].split(' ').slice(1).map(s => parseInt(s));

    let seedRanges = [];

    for (let is = 0; is < seeds.length; is += 2) {
        seedRanges.push([seeds[is], seeds[is] + seeds[is+1] - 1]);
    }

    console.log(seedRanges);

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

    /* Part One 
    let seeds_to_loc = seedRanges.map((seed) => {
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
    */

    seedRanges.forEach((sr) => {
        //for (let section of sections) {
            console.log(rangeIntoRanges(sr, sections[0]).sort((a, b) => a[0] - b[0]));
        //}
    })

    return 0;
}

const allLines =
["seeds: 15 114 55 13",
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
"56 93 4"];

//const allLines = fs.readFileSync('input_day_5.txt', 'utf-8').split('\n');
//allLines.pop();
console.log(readAlmanac(allLines));
