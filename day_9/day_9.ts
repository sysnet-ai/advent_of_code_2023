import * as fs from 'fs'

function seq2seq(seq: number[]) : number[]
{
    const newSeq = [];

    for (let i = 0; i < seq.length - 1; i++) {
        newSeq.push(seq[i+1] - seq[i]);
    }

    return newSeq;
}


function herstory(og: number[]) : number[][] {
    let seqHistory = [og];

    let curSeq = og;
    while (curSeq.filter((x) => x == 0).length != curSeq.length)
    {
        curSeq = seq2seq(curSeq);
        seqHistory.push(curSeq);
    }
    seqHistory.reverse();

    // Part One - we can leave it in I guess
    for (let i = 0; i < seqHistory.length - 1; i++) {
        let n = seqHistory[i+1];
        let c = seqHistory[i];
        n.push(c[c.length-1] + n[n.length-1]);
    }

    // Part Two - 
    for (let i = 0; i < seqHistory.length - 1; i++) {
        let n = seqHistory[i+1];
        let c = seqHistory[i];
        n.unshift(n[0] - c[0]);
    }

    console.log(seqHistory);
    return seqHistory;
}


/*
const lines = [
"0 3 6 9 12 15",
"1 3 6 10 15 21",
"10 13 16 21 30 45"]
*/


const lines = fs.readFileSync('input_day_9.txt', 'utf-8').split('\n');
lines.pop();

let x = lines.map((l) => {
    const s = l.split(' ').map(c => parseInt(c));
    return herstory(s).pop()![0];
}).reduce((pV, cV) => { return pV+cV }, 0);
console.log(x);
