

function timesBeatRecord(N: number, record: number) : number {
    let timesBeaten = 0;

    for (let i = 0; i <= N; i++) {
        if (i * (N-i) > record) {
            timesBeaten++;
        } 
    }

    return timesBeaten;
}

console.log(
[timesBeatRecord(59, 430),
timesBeatRecord(70, 1218),
timesBeatRecord(78, 1213),
timesBeatRecord(78, 1276)].reduce((prevV, curV) => { return prevV*curV}, 1));

