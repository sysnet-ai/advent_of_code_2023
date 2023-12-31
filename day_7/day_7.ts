import * as fs from 'fs'

const FIVE_OK = 0;
const FOUR_OK = 1;
const FHOUSE = 2;
const THREE_OK= 3;
const TWO_P = 4;
const P = 5;
const HC = 6



function findHandType(hand: string) {
    const r : Record<string, number> = {};
    for (const c of hand) {
        if (!r[c]) {
            r[c] = 0;
        }
        r[c] += 1;
    } 

    const jays = r['J'] ?? 0;
    if (jays == 5) return FIVE_OK;

    delete r['J'];
    const ordered = Object.entries(r).sort((a, b) =>  b[1] - a[1] );

    const highest = ordered[0][1] + jays;
    let secondH = 3141;
    if (ordered.length > 1) {
        secondH = ordered[1][1];
    }

    switch (highest) {
        case 5:
            return FIVE_OK;
        case 4:
            return FOUR_OK
        case 3:
            return secondH == 2 ? FHOUSE : THREE_OK;
        case 2:
            return secondH == 2 ? TWO_P : P;
        default:
            return HC; 
    }
}

function classifyHandsByType(handsAndBids: [string, number][]) : [string, number][][] {
    const handTypes: [string, number][][] = [[], [], [], [], [], [], []]; // There are 7 types of hand, 5 of a kind to high card
                                                                          // 0 = 5 of a kind, 1 = 4 of a kind...
    handsAndBids.forEach(([h, bid]) => {
        handTypes[findHandType(h)].push([h, bid]);
    }) 

    const specialSuits: Record<string, number> = {"A": 14, "K": 13, "Q": 12, "J": 0, "T": 10 };
    const sortedHands = handTypes.map((handsInType) => {

        return handsInType.sort((a, b) => {


            for (let i = 0; i < a[0].length; i++) {
                const ac = a[0][i];
                const bc = b[0][i];
                const fac: number =  specialSuits[ac] ?? parseInt(ac); 
                const fbc: number =  specialSuits[bc] ?? parseInt(bc); 

                if (fbc == fac) continue;
                return fbc - fac;
            }

            return 0;
        });
    })
    
    console.log(sortedHands);
    return sortedHands;
}

/*
const handsAndBids = 
["32T3K 765",
"T55J5 684",
"KK677 28",
"KTJJT 220",
"QQQJA 483",];
*/

const handsAndBids = fs.readFileSync('input_day_7.txt', 'utf-8').split('\n');
handsAndBids.pop();

const parsedHaB: [string, number][] = handsAndBids.map((hab) => {
    let h = hab.split(' ');
    return [h[0], parseInt(h[1])] ;
})
console.log(classifyHandsByType(parsedHaB).flat().reverse().reduce((prevV, [hand, bid], i) => {
    return prevV + (bid*(i+1));
}, 0));
