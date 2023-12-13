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

function equalOrRepaired(a:string, b: string, r: Record<string, boolean>) : boolean {
    if (a === b) return true;
    if (!a || !b) return false;

    let hasR = r["r"];
    console.log("A: ", a, "B: ", b);
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            if (!hasR) {
                hasR = true;
                continue;
            } else {
                return false;
            }
        }
    }

    r["r"] = hasR;
    return true;
}

function countReflected(map: string[]) : number {

    let p = -1;
    let a = -1;
    let mp = -1;

    for (let i = 1; i < map.length; i++) {
        let hasRepaired = {r: false};

        if (equalOrRepaired(map[i], map[i-1], hasRepaired)) {
            console.log("Yes: ", hasRepaired);
            mp = i;

            a = mp;
            p = mp -1;
        }

        while (p > -1 && a < map.length) {
            if ((p == 0 || a == (map.length-1)) && hasRepaired.r) { // PART TWO: Only accept repaired ones
                console.log(">>", mp);
                return mp;
            }

            p--;
            a++;

            if (!equalOrRepaired(map[p], map[a], hasRepaired)) {
                break;
            }
        } 

        p = -1;
        a = -1;
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


//const r = {r: false};
//console.log(equalOrRepaired("ABCD", "ABCD", r), r);

const lines = fs.readFileSync('input_day_13.txt', 'utf-8').split('\n\n');
const maps = lines.map((l) => l.split('\n'));
maps[maps.length-1].pop();

console.log(
    maps
    .map((m) => { 
        console.log("X");
        let v = countReflected(m);
        if (v > 0) {
            return v*100;
        }
        return countReflected(transpose(m));
    })
    .reduce((pv, cv) => {
        return pv+cv;
    }, 0));
