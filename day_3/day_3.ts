import * as fs from 'fs'


function getAt(arr:string[], x: number, y: number) : string {
    return arr[x].charAt(y);
}

function isNum(c: string) : boolean {
    const charCodeC = c.charCodeAt(0);
    const charCodeZero = "0".charCodeAt(0);
    const charCodeNine = "9".charCodeAt(0);

    return (charCodeC >= charCodeZero && charCodeC <= charCodeNine)
}

function isSym(c: string) : boolean {
    const r = !isNum(c) && c != ".";
    return r;
}

// For Part Two this should be called something like 'collect gear part numbers' but, whatever...
function areSymbolsAround(scheme: string[], lnum: number, coords: [number, number], gearRecord: Record<string, number[]>, pv: number) : boolean {
    let upperBound = Math.max(lnum - 1, 0);
    let lowerBound = Math.min(lnum + 1, scheme.length - 1);
    let leftBound = Math.max(coords[0] - 1, 0);
    let rightBound = Math.min(coords[1], scheme[0].length - 1);

    console.log("Testing bounds: ", coords, upperBound, lowerBound, leftBound, rightBound);
    if (upperBound != lnum) {
        console.log(scheme[upperBound].substring(leftBound, rightBound+1));
    }
    console.log(scheme[lnum].substring(leftBound, rightBound+1));
    if (lowerBound != lnum) {
        console.log(scheme[lowerBound].substring(leftBound, rightBound+1));
    }

    for (let i = upperBound; i <= lowerBound; i++) {
        for (let j = leftBound; j <= rightBound; j++) {
            if (i == lnum && j >= coords[0] && j < coords[1]) {
                continue; // this is the number itself
            }

            const c = getAt(scheme, i, j);
            if (isSym(c)) {
                console.log("...found with: ", c, " AT: ", i, " ", j);

                //Part two:
                if (c == "*") {
                    const key = i+","+j;
                    if (!gearRecord[key]) {
                        gearRecord[key] = [];
                    }
                    gearRecord[key].push(pv)
                }
                
                return true;
            }
        }
    }

    console.log("...not found");
    return false;
}

function readSchematic(scheme: string[]) : number[] {
    let partNums = []
    let gearRecord: Record<string, number[]> = {}
    for (const [lnum, line] of scheme.entries()) {
    //    console.log(line)
        const l = line.split('');

        let inx = 0;
        let numstart = 0;
        let parsingNum = false;
        while (inx < l.length) {
            const c = l[inx];

            if (isNum(c)) {
                if (!parsingNum) { 
                    //console.log("Starting Parsing...");
                    parsingNum = true;
                    numstart = inx;
                }

                if (inx == l.length - 1) {
                    let n = parseInt(line.substring(numstart, inx+1))
                    //console.log(`Finished Parsing...${n}`);
                    parsingNum = false;

                    if (areSymbolsAround(scheme, lnum, [numstart, inx+1], gearRecord, n)) {
                       partNums.push(n);
                    }
                }

            } else {
                if (parsingNum) {
                    let n = parseInt(line.substring(numstart, inx))
                   // console.log(`Finished Parsing...${n}`);
                    parsingNum = false;

                    if (areSymbolsAround(scheme, lnum, [numstart, inx], gearRecord, n)) {
                       partNums.push(n);
                    }
                    numstart = -1;
                }
            }

            inx++;
        }
    }

    console.log(gearRecord);
    let gearRatios = []; 
    for (const [ignored, values] of Object.entries(gearRecord)) {
        if (values.length == 2) {
            gearRatios.push(values.reduce((pv, cv) => { return pv*cv; }, 1));
        }
    }
    return gearRatios;
    //return partNums;
}


const scheme = fs.readFileSync('input_day3.txt', 'utf-8').split("\n");
scheme.pop()
/*const scheme = 
["467..114..",
"...*......",
"..35..633.",
"......#...",
"617*......",
".....+.58.",
"..592.....",
".......755",
"...$..*...",
".664.598.."]*/


console.log(readSchematic(scheme).reduce((prevV, currentV) => { return prevV + currentV;}, 0))
