import * as fs from 'fs'


function numToDigit(digitName: string) : string {

    let dict: Record<string, string> = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"};

    return dict[digitName];
}

function digitifyString(funnyString : string ) : string {
    //console.log("DFying:", funnyString);

    const nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let digitified = "";

    let matching: string[] = [];
    let subs = "";

    let subInx_s = 0;
    let subInx_e = 1;

    while (subInx_s < funnyString.length) {
        subs = funnyString.substring(subInx_s, subInx_e+1); 

        matching = nums.filter((ns) => {
            return ns.startsWith(subs);
        })

        //console.log(subs);
        if (matching.length == 0) {
            digitified += funnyString[subInx_s];
            matching = [];
            subs = "";
            subInx_s += 1;
        } else if (matching.length == 1 && matching[0] == subs) {
            digitified += numToDigit(subs);
            matching = [];
            subs = "";
            subInx_s = subInx_e;
            subInx_e = subInx_s + 1;
        } else {
            subInx_e += 1;

            if (subInx_e > funnyString.length) {
                digitified += funnyString.substring(subInx_s);
                break;
            }
        }
    }
    
    //console.log(">> ", digitified);
    return digitified;
}

function numberFromFunnyString(funnyString: string) : number {
    let first = 0;
    let last = 0;
    let firstFound = false;

    const charCodeZero = "0".charCodeAt(0);
    const charCodeNine = "9".charCodeAt(0);

    //
    for (let c of funnyString) {
        const charCodeC = c.charCodeAt(0);
        if (charCodeC >= charCodeZero && charCodeC <= charCodeNine)
        {
            const v = parseInt(c);
            if (!firstFound) {
                firstFound = true;
                first = v
            }
            last = v;
        }
    }
    return first*10 + last;
}

function findSum(allInputLines: string[]) : number {

    const allNumbers = allInputLines.map((funnyLine) => {
        return numberFromFunnyString(digitifyString(funnyLine));
    })

    return allNumbers.reduce((sum, currentNumber) => {
        return (sum+currentNumber);
    }, 0);
}

/*
console.log(findSum(
[
"two1nine",
"eightwothree",
"abcone2threexyz",
"xtwone3four",
"4nineeightseven2",
"zoneight234",
"7pqrstsixteen"
]));*/
console.log(findSum(fs.readFileSync('C:/Users/onja/Downloads/input_day_1.txt', 'utf-8').split('\n'))); 
