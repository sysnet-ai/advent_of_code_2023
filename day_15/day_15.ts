import * as fs from 'fs'

function hashish(s: string) : [number, string, string] {
    let cv = 0;
    let i = 0;
    for (; i < s.length; i++) {
        if (s[i] == "=" || s[i] == "-") {
            break;
        }
        cv += s.charCodeAt(i);
        cv *= 17;
        cv %= 256;
    }
    let x: [number, string, string] = [cv, s.slice(0, i), s.slice(i)];
    //console.log(x);
    return x;
}

function processAction(h: number, lens: string, action: string, record: Record<number, [string, number][]> ) {

    if (!record[h]) {
        record[h] = [];
    }
    let opOn = record[h];

    let foundInx = -1;
    for (let i = 0; i < opOn.length; i++) {
        if (opOn[i][0] == lens) {
            foundInx = i;
            break;
        }
    }

    if (action[0] == "=") {
        if (foundInx >= 0) {
            opOn[foundInx][1] = parseInt(action[1]);
        } else {
            opOn.push([lens, parseInt(action[1])]);
        }
    } else if (action[0] == "-") {
        if (foundInx >= 0) {
            opOn.splice(foundInx, 1);
        }
    }

    record[h] = opOn;
} 

//const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

const input = fs.readFileSync('input_day_15.txt', 'utf-8').split('\n');
input.pop();

//console.log(input[0].split(',').map((s) => hashish(s)).reduce((cv, pv) => { return cv+pv; }, 0));
//
const boxes: Record<number, [string, number][]> = {};

for (let x of input[0].split(',')) {
    //console.log(x);
    const [h,lens,action] = hashish(x);
    processAction(h, lens, action, boxes);
    //console.log(boxes);
}

let fpow = 0;
for (let [bx, lenses] of Object.entries(boxes)) {
    for (let [inx, [a, b]] of lenses.entries()) {
        fpow += (parseInt(bx)+1)*(inx+1)*b;
    }
}
console.log(fpow);
