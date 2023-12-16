import * as fs from 'fs'

const validPipe: string = "|-FLJ7";

function visitable(pos: [number, number], map: string[][]) : boolean {

    const y_pos_valid = pos[0] > -1 && pos[0] < map.length;
    const x_pos_valid = pos[1] > -1 && pos[1] < map[0].length;
    const char_valid = validPipe.includes(map[pos[0]][pos[1]]);

    return  y_pos_valid && x_pos_valid && char_valid;
}

function findPipeable(map: string[][], pos: [number, number]) : [number, number][] {
    const v = map[pos[0]][pos[1]];
    const pipeable: [number, number][] = [];

    const n : [number, number] = [pos[0] - 1,pos[1]]
    const s : [number, number] = [pos[0] + 1,pos[1]]
    const e : [number, number] = [pos[0],pos[1] + 1]
    const w : [number, number] = [pos[0],pos[1] - 1]

    switch (v) {
        case '|':
            if (visitable(n, map)) {
                pipeable.push(n);
            }
            if (visitable(s, map)) {
                pipeable.push(s);
            }
            break;
        case '-':
            if (visitable(e, map)) {
                pipeable.push(e);
            }
            if (visitable(w, map)) {
                pipeable.push(w);
            }
            break;
        case 'F':
            if (visitable(e, map)) {
                pipeable.push(e);
            }
            if (visitable(s, map)) {
                pipeable.push(s);
            }
            break;
        case 'J':
            if (visitable(n, map)) {
                pipeable.push(n);
            }
            if (visitable(w, map)) {
                pipeable.push(w);
            }
            break;
        case 'L':
            if (visitable(e, map)) {
                pipeable.push(e);
            }
            if (visitable(n, map)) {
                pipeable.push(n);
            }
            break;
        case '7':
            if (visitable(s, map)) {
                pipeable.push(s);
            }
            if (visitable(w, map)) {
                pipeable.push(w);
            }
            break;
    }

    return pipeable;
}


function whatIsSnake(map: string[][], snakePos: [number, number]) : string {
    let n = map[snakePos[0] - 1] ? map[snakePos[0] - 1][snakePos[1]] : ".";
    const s = map[snakePos[0] + 1][snakePos[1]]
    const e = map[snakePos[0]][ snakePos[1] + 1]
    const w = map[snakePos[0]][ snakePos[1] - 1]

    const northPipe = 'F7|'.includes(n);
    const southPipe = 'LJ|'.includes(s);
    const eastPipe = 'J7-'.includes(e);
    const westPipe = 'FL-'.includes(w);

    if (northPipe) {
        if (southPipe) {
            return '|';
        }

        if (eastPipe) {
            return 'L';
        }

        if (westPipe) {
            return 'J';
        }
    }


    if (southPipe) {
        if (eastPipe) {
            return 'F';
        }

        if (westPipe) {
            return '7';
        }
    }

    if (eastPipe) {
        if (westPipe) {
            return '-';
        }
    }

    throw Error("dafuq?");
}



function flood(map: string[][], startPos: [number, number]) : number {
    const positionsToExpand: [number, number, number][] = [[...startPos, 0]];
    let max = 0;
   
    while (positionsToExpand.length) {
        const pos = positionsToExpand.shift()!;


        const pable = findPipeable(map, [pos[0], pos[1]]);
        pable.forEach((p) => positionsToExpand.push([p[0], p[1], pos[2]+1]));

        let v = map[pos[0]][pos[1]]; 

        if (v == "-") {
            v = "H";
        } else if (v == "|") {
            v = "V";
        } else {
            v = (validPipe.lastIndexOf(v)-2).toString();
        }
        map[pos[0]][pos[1]] = v; 

        if (pable.length == 0) {
            max = pos[2];
            break;
        }
    }

    return max;
}

function replaceSnake(map: string[][]) : [number, number] {
    let pos: [number, number] = [-1, -1];
    for (let i = 0; i < map.length; i++) {
        const j = map[i].lastIndexOf('S');
        if (j > -1) {
            pos = [i, j];
            break;
        }
    }

    map[pos[0]][pos[1]] = whatIsSnake(map, pos);
    return pos;
}

/*function countEnclosed(map: string[][]) {
    for(let i = 0; i < map.length; i++) {
        let inToggle = false;
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 'V' || map[i][j] == 'B') {
                inToggle = !inToggle;
            } else if (inToggle && map[i][j] != 'H') {
                map[i][j] = '?';
            }
        }
    }

    for (let j = 0; j < map[0].length; j++) {
        let inToggle = false;
        for (let i = 0; i < map.length; i++) {
            if (map[i][j] == 'H' || map[i][j] == 'B') {
                inToggle = !inToggle;
            } else if (inToggle && map[i][j] != 'V') {
                map[i][j] = "!";
            }
        }
    }
}
*/

function clearNonPath(map: string[][]) { 
    // Clear everything that isn't part of the main loop
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (!"0123HV".includes(map[i][j])) {
                map[i][j] =".";
            }
        }
    }
}

function paintBucketAlgorithm(map: string[][]) {
    // Find all the blocks of adjacent empties
    const adjacents = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == "." || map[i][j] == "*") {

                const toVisit = [[i,j]];
                const adj = [];

                while (toVisit.length > 0) {

                    let v = toVisit.pop()!;
                    const [k, q] = v;
                    if (map[k][q] == ".") {
                        map[k][q]= "?";
                    } else if (map[k][q] == "*") {
                        map[k][q]= "!";
                    }
                    adj.push([k, q]);

                    const n : [number, number] = [k - 1,q]
                    const s : [number, number] = [k + 1,q]
                    const e : [number, number] = [k,q + 1]
                    const w : [number, number] = [k,q - 1]

                    const dirs = [n,s,w,e];
                    for (const d of dirs) {
                        if (d[0] >= 0 && d[0] < map.length &&
                            d[1] >= 0 && d[1] < map[i].length && ".*".includes(map[d[0]][d[1]])) {
                            toVisit.push([d[0], d[1]]);
                        }
                    }
                }

                adjacents.push(adj);
            }
        }
    }

    // For each group of adjacent empties
outer_loop:
    for (const adj of adjacents) {
        for (const a of adj) {
            const [k, q] = a; 
            const n : [number, number] = [k - 1,q]
            const s : [number, number] = [k + 1,q]
            const e : [number, number] = [k,q + 1]
            const w : [number, number] = [k,q - 1]

            const dirs = [n,s,w,e];

            const v = dirs.filter((d) => {
                return (d[0] < 0 || d[0] >= map.length || d[1] < 0 || d[1] >= map[0].length);
            });

            if (v.length > 0) {
                continue outer_loop;
            }
        }

        let exes = 0;
        for (const a of adj) {
            if (map[a[0]][a[1]] == "?") {
                map[a[0]][a[1]] = "X";
                exes++;
            }
        }

        console.log(exes);
    }

    //console.log(adjacents);
}

//"FLJ7";
function hAdjacentFor(s: string) {
    switch (s) {
        case "H":
            return "H";
        case "0":
            return "H";
        case "1":
            return "H";
        default:
            return "*";
    }
}

function vAdjacentFor(s: string) {
    switch (s) {
        case "V":
            return "V";
        case "0":
            return "V";
        case "3":
            return "V";
        default:
            return "*";
    }
}

function expandMap(map: string[][]) : string[][] {
    const expandedMap = []

    for (let i = 0; i < map.length; i++) {
        const row = [];
        for (let j = 0; j < map[0].length; j++) {
            row.push(map[i][j]);
            row.push(hAdjacentFor(map[i][j]));
        }
        expandedMap.push(row);

        const newRow = [];
        for (let j = 0; j < row.length; j++) {
            newRow.push(vAdjacentFor(row[j]));
        }
        expandedMap.push(newRow);
    }

    return expandedMap;
}

/*
const map = 
["..F7.".split(''),
".FJ|.".split(''),
"FJ.L7".split(''),
"|F--J".split(''),
"LJ...".split('')]
*/
/*
const map =  [
".....".split(''),
".S-7.".split(''),
".|.|.".split(''),
".L-J.".split(''),
".....".split('')];
*/
/*const map = [
"7-F7-".split(''),
".FJ|7".split(''),
"SJLL7".split(''),
"|F--J".split(''),
"LJ.LJ".split('')]
*/

/*
const map =  [
".F----7F7F7F7F-7....".split(''),
".|F--7||||||||FJ....".split(''),
".||.FJ||||||||L7....".split(''),
"FJL7L7LJLJ||LJ.L-7..".split(''),
"L--J.L7...LJS7F-7L7.".split(''),
"....F-J..F7FJ|L7L7L7".split(''),
"....L7.F7||L7|.L7L7|".split(''),
".F...|FJLJ|FJ|F7|.LJ".split(''),
"....FJL-7.||.||||...".split(''),
".L..L---J.LJ.LJLJ.|.".split('')]
*/

const mapLines = fs.readFileSync('input_day_10.txt', 'utf-8').split('\n');
mapLines.pop();
const map = mapLines.map((l) => l.split(''));


let p = replaceSnake(map);
flood(map, p);
clearNonPath(map);
const emap = expandMap(map);
paintBucketAlgorithm(emap);
emap.forEach(l => console.log(l.join('')));
//console.log(map.map((l) => l.join('')));
//
for (let i = 0; i < emap.length; i+=2) {
    let s = "";
    for (let j = 0; j < emap[i].length; j+=2) {
        s += emap[i][j]
    }
    console.log(s);
}

