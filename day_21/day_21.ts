import * as fs from 'fs'

function takeStep(toVisit: [number, number][], map: string[]) : [number, number][] {
    const futureVisits: [number, number][] = [];
    const accounted = new Set<string>();

    toVisit.forEach(pos => {
        const n : [number, number] = [pos[0] - 1,pos[1]];
        const s : [number, number] = [pos[0] + 1,pos[1]];
        const e : [number, number] = [pos[0],pos[1] + 1];
        const w : [number, number] = [pos[0],pos[1] - 1];

        [n, s, e, w].filter(d => {
           return d[0] >= 0 && d[1] >= 0 && d[0] < map.length && d[1] < map[0].length && "S.".includes(map[d[0]][d[1]]); 
        }).forEach(d => {
            const k = d[0]+","+d[1];
            if (!accounted.has(k)) {
                accounted.add(k);
                futureVisits.push(d);
            }
        });
    })

    return futureVisits;
}

function getStart(map: string[]) : [number, number] {
    for(let i = 0; i < map.length; i++)
        for(let j = 0; j < map.length; j++)
            if (map[i][j] == "S") return [i, j];

    return [-1, -1]
}

/*
const map = [
"...........",
".....###.#.",
".###.##..#.",
"..#.#...#..",
"....#.#....",
".##..S####.",
".##..#...#.",
".......##..",
".##.#.####.",
".##..##.##.",
"..........."]
let maxSteps = 6
*/

const map = fs.readFileSync('input_day_21.txt', 'utf-8').split('\n');
map.pop();
let maxSteps = 64;


let steps = 0;

let toVisit: [number, number][] = [getStart(map)]

while (steps < maxSteps) {
    toVisit = takeStep(toVisit, map);
    steps++;
}

console.log(toVisit.length);
