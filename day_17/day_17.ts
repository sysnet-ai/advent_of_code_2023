import PriorityQueue from 'ts-priority-queue';
import * as fs from 'fs'

enum Dir {
    N=0,
    E,
    S,
    W
}


class Node {
    heatLoss: number;
    curDir: Dir;
    repeatDir: number;
    position: [number, number];

    constructor(p:[number, number], rd:number, hl:number, cd: Dir) {
        this.heatLoss = hl;
        this.position = p;
        this.repeatDir = rd;
        this.curDir = cd;
    }
}


function aStar(map: string[]) {
    const q = new PriorityQueue({
        comparator: function(a:Node, b:Node) {
            return a.heatLoss - b.heatLoss;
        }
    });

    const visited:Record<string, number> = {};

    const target = [map.length-1, map[0].length-1];
    let start = new Node([0,0], 0, 0, Dir.E);

    q.queue(start);
    visited["0,0,E,0"] = 0;

    while(q.length > 0) {
        console.log(q.length);
        const visiting = q.dequeue()!;
        const [x, y] = visiting.position;
        const k = x+","+y+","+visiting.curDir+","+visiting.repeatDir;

        if (x == target[0] && y == target[1]) {
            console.log("FOUND!: ", visiting.heatLoss);
            break;
        }

        const n = [x-1, y, Dir.N];
        const s = [x+1, y, Dir.S];
        const e = [x, y+1, Dir.E];
        const w = [x, y-1, Dir.W];


        [n,e,s,w].forEach((d) => {
            let rd = 1;
            if (d[2] == visiting.curDir) {
                rd = visiting.repeatDir+1;
            }

            const k = d[0]+","+d[1]+","+d[2]+","+rd;
            const inbounds = d[0] >= 0 && d[0] < map.length && d[1] >= 0 && d[1] < map[0].length;

            let hl = -1;
            if (inbounds) {
                hl = visiting.heatLoss + parseInt(map[d[0]][d[1]]);
            }
            
            const shouldVisit = inbounds && (!visited[k] || visited[k] > hl);
            const dirValid = (d[2]+2)%4 != visiting.curDir && ((d[2] != visiting.curDir) || visiting.repeatDir < 3);

            if (shouldVisit && dirValid) {
                visited[k] = hl;
                q.queue(new Node([d[0], d[1]], rd, hl, d[2]));
            }
        });
    }
}

/*
const map = [
"2413432311323",
"3215453535623",
"3255245654254",
"3446585845452",
"4546657867536",
"1438598798454",
"4457876987766",
"3637877979653",
"4654967986887",
"4564679986453",
"1224686865563",
"2546548887735",
"4322674655533"]
*/

const map = fs.readFileSync('input_day_17.txt', 'utf-8').split('\n');
map.pop();

aStar(map);
