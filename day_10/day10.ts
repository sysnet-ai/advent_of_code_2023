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

        map[pos[0]][pos[1]] = "X"; 

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

/*
const map = 
["..F7.".split(''),
".FJ|.".split(''),
"FJ.L7".split(''),
"|F--J".split(''),
"LJ...".split('')]
*/
/*const map =  [
".....".split(''),
".F-7.".split(''),
".|.|.".split(''),
".L-J.".split(''),
".....".split('')];*/
/*const map = [
"7-F7-".split(''),
".FJ|7".split(''),
"SJLL7".split(''),
"|F--J".split(''),
"LJ.LJ".split('')]
*/

const mapLines = fs.readFileSync('input_day_10.txt', 'utf-8').split('\n');
mapLines.pop();

const map = mapLines.map((l) => l.split(''));

let p = replaceSnake(map);
console.log(p);
console.log(flood(map, p));

