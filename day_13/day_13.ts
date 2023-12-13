import * as fs from 'fs'


function transpose(map: string[]) : string[] {
    const t_map = [];

    for (let i = 0; i < map[0].length; i++) {
        let row = ""; 
        for (let j = 0; j < map.length; j++) {
            row += map[j][i];
        }
        t_map.push(row);
    }

    return t_map;

}

function countReflected(map: string[]) : number {

    let p = -1;
    let a = -1;
    let mp = -1;

    for (let i = 1; i < map.length; i++) {
        if (map[i] === map[i-1]) {
            mp = i;

            a = mp;
            p = mp -1;
        }


        while (p > -1 && a < map.length) {
            if (map[a] != map[p]) break;

            if (p == 0 || a == (map.length-1)) {
                return mp;
            }

            p--;
            a++;
        } 
    }

    return 0;
}

/*
const maps = [ 
["#.##..##.",
"..#.##.#.",
"##......#",
"##......#",
"..#.##.#.",
"..##..##.",
"#.#.##.#."],
[
"#...##..#",
"#....#..#",
"..##..###",
"#####.##.",
"#####.##.",
"..##..###",
"#....#..#"]]
*/

const lines = fs.readFileSync('input_day_13.txt', 'utf-8').split('\n\n');
const maps = lines.map((l) => l.split('\n'));
maps[maps.length-1].pop();

console.log(
    maps
    .map((m) => { 
        let v = countReflected(m);
        if (v > 0) {
            return v*100;
        }
        return countReflected(transpose(m));
    })
    .reduce((pv, cv) => {
        return pv+cv;
    }, 0));
