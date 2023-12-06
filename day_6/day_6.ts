
// Part Two
function minimumToBeat(N: number, record: number) : number {
    let minToBeat = 0;

    for (let i = 0; i <= N; i++) {
        if (i * (N-i) > record) {
            minToBeat = i;
            break;
        }
    }

    return minToBeat;
}



// Part One
function timesBeatRecord(N: number, record: number) : number {
    let timesBeaten = 0;

    for (let i = 0; i <= N; i++) {
        if (i * (N-i) > record) {
            timesBeaten++;
        } 
    }

    return timesBeaten;
}


//const ins = [[7,9], [15,40], [30,200]];
//const ins = [[71530, 940200]];
/*
 Time:        
 Distance:    
*/
const ins = [[59707878, 430121812131276]];

console.log(ins.map(([N, record]) => {
    const m = minimumToBeat(N, record);
    return N - 2*m + 1;
}));


/* PART ONE
console.log(
[minimumToBeat(7, 9),
minimumToBeat(15, 40),
minimumToBeat(30, 200)].reduce((prevV, curV) => { return prevV*curV}, 1));
*/

