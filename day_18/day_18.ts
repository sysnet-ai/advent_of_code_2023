import * as fs from 'fs'

function getSizeAndOffset(instructions: [string, number][]) : [[number, number], [number, number]] {
    const currP = [0, 0];
    const xs = [0,0];
    const ys = [0,0];

    instructions.forEach(([d, steps]) => {
        switch (d) {
            case "U":
                currP[0] -= steps;
                break;
            case "D":
                currP[0] += steps;
                break;
            case "L":
                currP[1] -= steps;
                break;
            case "R":
                currP[1] += steps;
                break;
        }
        xs[0] = Math.min(currP[0], xs[0]);
        xs[1] = Math.max(currP[0], xs[1]);
        ys[0] = Math.min(currP[1], ys[0]);
        ys[1] = Math.max(currP[1], ys[1]);
    })

    const offset: [number, number] = [0, 0];

    if (xs[0]<0) {
        offset[0] = Math.abs(xs[0]);
    }

    if (ys[0]<0) {
        offset[1] = Math.abs(ys[0]);
    }

    return [[xs[1] - xs[0] + 1, ys[1] - ys[0] + 1], offset];
}

function followInstr(instr: [string, number][], offset: [number, number], map: string[][]) {
    const currP = offset;
    instr.forEach(([d, steps]) => {
        const prevLoc = [...currP]
        switch (d) {
            case "U":
                currP[0] -= steps;
                break;
            case "D":
                currP[0] += steps;
                break;
            case "L":
                currP[1] -= steps;
                break;
            case "R":
                currP[1] += steps;
                break;
        }
        //console.log(currP);

        const start_y = Math.min(prevLoc[0], currP[0]);
        const start_x = Math.min(prevLoc[1], currP[1]);

        const end_y = Math.max(prevLoc[0], currP[0])
        const end_x = Math.max(prevLoc[1], currP[1])

        for (let i = start_y; i <= end_y; i++) {
            for (let j = start_x; j <= end_x; j++) {
                map[i][j] = "#";
            }
        }
    });
}

function paintBucketAlgorithm(map: string[][]) : number {
    // Find all the blocks of adjacent empties
    const adjacents = [];
    let exes = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == ".") {

                const toVisit = [[i,j]];
                const adj = [];

                while (toVisit.length > 0) {

                    let v = toVisit.pop()!;
                    const [k, q] = v;
                    if (map[k][q] == ".") {
                        map[k][q]= "?";
                    }
                    adj.push([k, q]);

                    const n : [number, number] = [k - 1,q]
                    const s : [number, number] = [k + 1,q]
                    const e : [number, number] = [k,q + 1]
                    const w : [number, number] = [k,q - 1]

                    const dirs = [n,s,w,e];
                    for (const d of dirs) {
                        if (d[0] >= 0 && d[0] < map.length &&
                            d[1] >= 0 && d[1] < map[i].length && map[d[0]][d[1]] == ".") {
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

        for (const a of adj) {
            if (map[a[0]][a[1]] == "?") {
                map[a[0]][a[1]] = "X";
                exes++;
            }
        }

        //console.log(exes);
    }

    //console.log(adjacents);
    return exes;
}

function followInstrPartTwo(instructions: [string, number][]) {
    const currP: [number, number] = [0, 0];
    let perimiter = 0;

    const pointR : Record<string, [number, number][]> = {};
    instructions.forEach(([d, steps]) => {
        perimiter += steps;
        switch (d) {
            case "U":
                currP[0] -= steps;
                break;
            case "D":
                currP[0] += steps;
                break;
            case "L":
                currP[1] -= steps;
                break;
            case "R":
                currP[1] += steps;
                break;
        }

        if (!pointR[currP[0]]) {
            pointR[currP[0]] = [];
        }
        pointR[currP[0]].push([...currP]);
    })

    console.log(perimiter);

    let area = 0;

    const points = Object.entries(pointR).map(([k, list]) => list.sort((a, b) => a[1] - b[1]));

    let curPoints = points.pop()!;
    while(points.length > 0) {
        let nxtPoints = points.pop()!;



    }



    return pointR;
}

const instr_s = [
"R 6 (#70c710)",
"D 5 (#0dc571)",
"L 2 (#5713f0)",
"D 2 (#d2c081)",
"R 2 (#59c680)",
"D 2 (#411b91)",
"L 5 (#8ceee2)",
"U 2 (#caa173)",
"L 1 (#1b58a2)",
"U 2 (#caa171)",
"R 2 (#7807d2)",
"U 3 (#a77fa3)",
"L 2 (#015232)",
"U 2 (#7a21e3)",
];

/*const instr_s = fs.readFileSync('input_day_18.txt', 'utf-8').split('\n');
instr_s.pop();*/
const instr: [string, number][] = instr_s.map((l) => {
    const std = l.split(' ');

    return [std[0], parseInt(std[1])]
})

//const instr:[string, number][] = [ ["u", 5], ["l", 3], ["d", 3], ["d", 3]];
// PART ONE:
const [size, offset] = getSizeAndOffset(instr)
console.log(offset);
const map = [];
for (let i = 0; i < size[0]; i++) {
    const row = []
    for (let j = 0; j < size[1]; j++) {
        row.push(".");
    }
    map.push(row);
}

followInstr(instr, offset, map);
let exes = 0;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == "#") { exes += 1; }
    }
}
exes += paintBucketAlgorithm(map);
console.log("PART ONE: ", exes);
// </PART ONE>
//
console.log("PART TWO: ", followInstrPartTwo(instr));
