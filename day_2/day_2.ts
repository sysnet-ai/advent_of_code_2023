import * as fs from 'fs'

const availableCubes: Record<string, number>  = {"red": 12, "green": 13, "blue": 14 };
function gameValid(revealed: string[]) : boolean {

    const x = revealed.map((turn) => {
        return turn.split(',');
    })
     .flat()
     .map((s) => s.trim());
      
    let valid = true;
    x.forEach((pull) => {
        const r = pull.split(' ');
        valid = valid && availableCubes[r[1]] >= parseInt(r[0]);
    });

    return valid;
}

function minimalPerColor(revealed: string[]) : number[] {
    const inGame: Record<string, number> = {"red": 0, "blue": 0, "green": 0}

    const x = revealed.map((turn) => {
        return turn.split(',');
    })
     .flat()
     .map((s) => s.trim());

    x.forEach((pull) => {
        const r = pull.split(' ');
        const v = inGame[r[1]];
        const nV = parseInt(r[0]);

        if (v < nV) {
            inGame[r[1]] = nV;
        }
    });

    return [inGame["red"], inGame["green"], inGame["blue"]];
}

function splitGameLine(gameLine: string) : string[] {
    return gameLine.replace(/Game \d+:/, "").split(";");
}

/*
const games = 
[
"Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
"Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
"Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
"Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
"Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
]
*/

const games = fs.readFileSync('input_day_2.txt', 'utf-8').split('\n');

console.log(" Part One: ",
    games
        .map((game, i) => {
            let res = 0;
            if (gameValid(splitGameLine(game))) {
                res = i + 1;
            } else {
                console.log(game, " rejected");
            }

            return res;
        })
        .reduce((prevV, currentV) => {
            return prevV + currentV;
        }, 0));

console.log(" Part Two: ", 
    games
        .map((game) => {
            return minimalPerColor(splitGameLine(game)).reduce((prevV, currentV) => {
                return prevV * currentV;
            }, 1);
        })
        .reduce((prevV, currentV) => {
            return prevV + currentV;
        }, 0));
