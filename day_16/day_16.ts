import * as fs from 'fs'

enum Dir {
    N = 0,
    E,
    S,
    W,
}
class Beam {
    position: [number, number];
    direction: Dir;

    constructor(p: [number, number], d: Dir) {
        this.position = p;
        this.direction = d;
    }
}




function advanceBeams(map: string[], beams: Beam[]) {

    const visited = new Set<string>();
    const splittersTouched = new Set<string>();

    while (beams.length > 0) {
        const to_rem = [];
        const beam = beams.pop()!;

beamLoop:
        while (true) {
            let nxtpos = beam.position;
            visited.add("" + nxtpos[0] + "," + nxtpos[1]);

            const splitterCode = ("" + nxtpos[0] + "," + nxtpos[1] + "," + beam.direction % 2);

            switch (map[nxtpos[0]][nxtpos[1]]) {
                case '-':

                    if (beam.direction == Dir.S || beam.direction == Dir.N) {
                        if (splittersTouched.has(splitterCode)) {
                            break beamLoop;
                        } else {
                            splittersTouched.add(splitterCode);
                        }

                        beam.direction = Dir.E;

                        let clone = new Beam([...beam.position], Dir.W);

                        beams.push(clone);
                    }
                    break;
                case '|':
                    if (beam.direction == Dir.E || beam.direction == Dir.W) {
                        if (splittersTouched.has(splitterCode)) {
                            console.log("!");
                            break beamLoop;
                        } else {
                            splittersTouched.add(splitterCode);
                        }
                        beam.direction = Dir.N;

                        let clone = new Beam([...beam.position], Dir.S);
                        
                        beams.push(clone);
                    }
                    break;

                case '\\':
                    switch (beam.direction) {
                        case (Dir.N):
                            beam.direction = Dir.W;
                            break;
                        case (Dir.S):
                            beam.direction = Dir.E;
                            break;
                        case (Dir.E):
                            beam.direction = Dir.S;
                            break;
                        case (Dir.W):
                            beam.direction = Dir.N;
                            break;
                    }
                    break;

                case '/':
                    switch (beam.direction) {
                        case (Dir.N):
                            beam.direction = Dir.E;
                            break;
                        case (Dir.S):
                            beam.direction = Dir.W;
                            break;
                        case (Dir.E):
                            beam.direction = Dir.N;
                            break;
                        case (Dir.W):
                            beam.direction = Dir.S;
                            break;
                    }
                    break;

                default:
                    break;
            }

            switch (beam.direction) {
                case (Dir.N):
                    nxtpos[0] -= 1;
                    break;
                case (Dir.E):
                    nxtpos[1] += 1;
                    break;
                case (Dir.S):
                    nxtpos[0] += 1;
                    break;
                case (Dir.W):
                    nxtpos[1] -= 1;
                    break;
            }

            if ( nxtpos[0] < 0 || nxtpos[0] >= map.length || nxtpos[1] < 0 || nxtpos[1] >= map[0].length) {
                break;
            }
        }
    }

    return visited;
} 



/*
const map = [
".|...\\....",
"|.-.\\.....",
".....|-...",
"........|.",
"..........",
".........\\",
"..../.\\\\..",
".-.-/..|..",
".|....-|.\\",
"..//.|....",
]
*/

const map = fs.readFileSync('input_day_16.txt', 'utf-8').split('\n');
map.pop();

let msize = 0;

for (let i = 0; i < map.length; i++) {
    let s = advanceBeams(map, [new Beam([i,0], Dir.E)]);
    let s2 = advanceBeams(map, [new Beam([i, map.length-1], Dir.W)]);

    msize = Math.max(s.size, s2.size, msize);
}

for (let i = 0; i < map[0].length; i++) {
    let s = advanceBeams(map, [new Beam([0,i], Dir.S)]);
    let s2 = advanceBeams(map, [new Beam([map.length-1, i], Dir.N)]);

    msize = Math.max(s.size, s2.size, msize);
}

console.log("Res: ", msize);

/*
const smap = map.map(l => l.split(''));


s.forEach(p => {
    console.log(p);
    const pint = p.split(",");
    smap[parseInt(pint[0])][parseInt(pint[1])] = "#"
})

smap.forEach(l => console.log(l.join('')));
*/
