import * as fs from 'fs'

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

const mapd = map.map((l) => l.split(''));

rollNorth(mapd);
console.log(mapd.forEach(l => console.log(l.join(''))));
console.log(countLoad(mapd));





