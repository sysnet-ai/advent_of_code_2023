
function findDisintegratable() {
}

// Create the 3D rep
function parse(lines: string[]) : string[][][] {
    const r: Record<number, [ [number, number, number], [number, number, number] ]> = {};

    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    lines.forEach((l, inx) => {
        const [c1, c2] = l.split("~");

        const n1 = c1.split(',').map(n=>parseInt(n));
        const n2 = c2.split(',').map(n => parseInt(n));

        maxX = Math.max(n2[0], maxX);
        maxY = Math.max(n2[1], maxY);
        maxZ = Math.max(n2[2], maxZ);

        r[inx+1] = [[n1[0], n1[1], n1[2]] , [n2[0], n2[1], n2[2]]]
    });

    console.log(maxX, maxY, maxZ);

    const toRet: string[][][] = [];
    for (let k = 0; k < maxZ+1; k++) {
        const plane = []
        for (let i = 0; i < maxY+1; i++) {
            const row  = []
            for (let j = 0; j < maxX+1; j++) {
                row.push(".");
            }
            plane.push(row);
        }
        toRet.push(plane);
    }

    Object.entries(r).forEach(([key, coords]) => {
        console.log(key, coords);
        for (let k = coords[0][2]; k < coords[1][2]+1; k++) {
            for (let i = coords[0][1]; i < coords[1][1]+1; i++) {
                for (let j = coords[0][0]; j < coords[1][0]+1; j++) {
                    toRet[k][i][j] = key;
                }
            }
        }
    });

    return toRet;
}

function fallDown(threeD: number[][][]) {
    for (let k = 0; k < threeD.length; k++) {
        for (let i = 0; i < threeD[0].length; i++) {
            for (let j = 0; j < threeD[1].length; j++) {
            }
        }
    }
}

const lines = [ 
"1,0,1~1,2,1",
"0,0,2~2,0,2",
"0,2,3~2,2,3",
"0,0,4~0,2,4",
"2,0,5~2,2,5",
"0,1,6~2,1,6",
"1,1,8~1,1,9" ]

console.log(parse(lines));
