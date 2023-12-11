import * as fs from 'fs'

function findGalaxies(map: string[]) : [number, number][] {
    const galaxies: [number, number][] = [];


    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == "#") {
                galaxies.push([i, j]);
            }
        }
    }

    return galaxies;
}

function findEmptyRows(map: string[]) : number[] {
    const emptyRs = [];    
    for (let i = 0; i < map.length; i++) {
        if (map[i].includes('#')) {
            continue;
        }
        emptyRs.push(i);
    }

    return emptyRs;
}

function findEmptyCols(map: string[]) : number[] {
    const emptyCs = [];

outer_loop:
    for (let i = 0; i < map[0].length; i++) {
        for (let j = 0; j < map.length; j++) {
            if (map[j][i] == "#") {
                continue outer_loop;
            }
        }
        emptyCs.push(i);
    }

    return emptyCs;
}



function expandedManhattanDist(pos1: [number, number], pos2: [number, number],
                               expandedRows: number[], expandedCols: number[]) : number {

    let hManh = Math.abs(pos1[1] - pos2[1]);
    let vManh = Math.abs(pos1[0] - pos2[0]); 

    const hStart = Math.min(pos1[1], pos2[1]);
    const hEnd = Math.max(pos1[1], pos2[1]);
    const vStart = Math.min(pos1[0], pos2[0]);
    const vEnd = Math.max(pos1[0], pos2[0]);

    expandedCols.forEach((ec) => {
        if (hStart < ec && ec < hEnd) {
            hManh += 1;
        }
    });

    expandedRows.forEach((er) => {
        if (vStart < er && er < vEnd) {
            vManh += 1;
        }
    });

    return hManh+vManh;
}

function allDistances(gxies: [number, number][],
                      expandedRows: number[], expandedCols: number[]) : number[] {

    const distances = [];
    for (let g = 0; g < gxies.length; g++) {
        for (let x = g+1; x < gxies.length; x++) {
            distances.push(expandedManhattanDist(gxies[g], gxies[x],
                                                 expandedRows, expandedCols));
        }
    }
    return distances;

}

/*
const map = [
"...#......",
".......#..",
"#.........",
"..........",
"......#...",
".#........",
".........#",
"..........",
".......#..",
"#...#....."]
*/

const map = fs.readFileSync('input_day_11.txt', 'utf-8').split('\n');
map.pop();


const gxies = findGalaxies(map);
const emptyCs = findEmptyCols(map);
const emptyRs = findEmptyRows(map);

console.log(allDistances(gxies, emptyRs, emptyCs).reduce((pV, cV) => { return pV+cV; }, 0));

//console.log(expandedManhattanDist([5,1], [9,4], [3, 7], [2,5,8]));
