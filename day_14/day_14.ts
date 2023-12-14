import * as fs from 'fs'

function hashish(s_in: string) : number {
  var hash = 0,
    i, chr;
  if (s_in.length === 0) return hash;
  for (i = 0; i < s_in.length; i++) {
    chr = s_in.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function rotate(map: string[][]) : string[][] {
    const t_map = [];

    for (let i = 0; i < map[0].length; i++) {
        let row = []; 
        for (let j = 0; j < map.length; j++) {
            row.unshift(map[j][i]);
        }
        t_map.push(row);
    }

    return t_map;

}

function rollNorth(map: string[][]) {

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            
            if (map[i][j] == 'O'){
                let x = i-1;
                while (x >= 0) {
                    if (map[x][j] != '.') {
                        break;
                    }
                    x--;
                }

                x++;
                map[i][j] = '.';
                map[x][j] = 'O';
            }
        }
    }
}

function countLoad(map: string[][]) : number {
    let totalLoad = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 'O') {
                let l = (map.length - i);
                totalLoad += l;
            }
        }
    }
    return totalLoad;
}

/*const map = [
"O....#....",
"O.OO#....#",
".....##...",
"OO.#O....O",
".O.....O#.",
"O.#..O.#.#",
"..O..#O..O",
".......O..",
"#....###..",
"#OO..#...."]
*/

const map= fs.readFileSync('input_day_14.txt', 'utf-8').split('\n');
map.pop();

let mapd = map.map((l) => l.split(''));

function cycle(t: string[][]) {
    rollNorth(t);
//    t.forEach(l => console.log(l.join('')))
//    console.log('\n\n')

    t = rotate(t);
    rollNorth(t);
//    t.forEach(l => console.log(l.join('')))
//    console.log('\n\n')

    t = rotate(t);
    rollNorth(t);
//    t.forEach(l => console.log(l.join('')))
//    console.log('\n\n')

    t = rotate(t);
    rollNorth(t);
//    t.forEach(l => console.log(l.join('')))
//    console.log('\n\n')

    t = rotate(t);
//    t.forEach(l => console.log(l.join('')))
//    console.log('\n\n')
    return t;
}

const r:Record<number, number> = {}
let s = 0;
let cyclesleft = 1000000000;
while(cyclesleft) {
    mapd = cycle(mapd);
    s++;
    cyclesleft--;

    let hc = hashish(mapd.map(l => l.join('')).join(''));
    if (!!r[hc]) {
       console.log(">>", s, r[hc]);

        cyclesleft = ((1000000000-s)%(s-r[hc]));

       //mapd.forEach(l => console.log(l.join('')));
       continue; 
    }

    //console.log("\n\n", "After: ", s);
    //mapd.forEach(l => console.log(l.join('')));
    r[hc] = s;
}
console.log("LOAD: ", countLoad(mapd));
