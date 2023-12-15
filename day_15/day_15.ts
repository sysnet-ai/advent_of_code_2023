import * as fs from 'fs'

function hashish(s: string) : number {
    let cv = 0;
    for (let i = 0; i < s.length; i++) {
        cv += s.charCodeAt(i);
        cv *= 17;
        cv %= 256;
    }
    return cv;
}

//const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

const input = fs.readFileSync('input_day_15.txt', 'utf-8').split('\n');
input.pop();

console.log(input[0].split(',').map((s) => hashish(s)).reduce((cv, pv) => { return cv+pv; }, 0));
