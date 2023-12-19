import * as fs from 'fs'

// Part One
class Functor {
    func_str: string;
    if_true: string;
    if_false: Functor | string;

    constructor(fstr: string, if_true: string, if_false: Functor | string) {
        this.func_str = fstr;
        this.if_true = if_true;
        this.if_false = if_false;
    }

    call(x: number, m: number, a:number, s:number) : Functor | string {

        if (eval(this.func_str)) {
            return this.if_true;
        }

        if (typeof this.if_false == "string") {
            return this.if_false;
        } else {
            return this.if_false.call(x, m, a, s);
        }
    }
}


class Spec {
    x: number;
    m: number;
    a: number;
    s: number;

    constructor(x: number,
                m: number,
                a: number,
                s: number) {
        this.x = x;
        this.m = m;
        this.a = a;
        this.s = s;
    }
}
// </PART ONE>

type Link = Nodetor | null;
class Nodetor {
    content: string;
    if_true: Link;
    if_false: Link;
    constructor(content: string, if_true: Link, if_false: Link) {
        this.content = content;
        this.if_true = if_true;
        this.if_false = if_false;
    }

    is_terminal() : boolean {
        return this.content === "A" || this.content == "R";
    }

    is_jump() : boolean {
        return !this.is_terminal() && !this.if_true && !this.if_false;
    }
}

function qualityAssure(pieceSpecs: Spec, wflows: Record<string, Functor>) : boolean {


    const {x,m,a,s} = pieceSpecs;

    let lbl = 'in';
    while (true) {
        let cur: Functor = wflows[lbl];

        let nlbl = cur.call(x, m, a, s);
        
        while (typeof nlbl != "string") {
            nlbl = nlbl.call(x, m, a, s);
        }
        lbl = nlbl.toString();

        if (lbl === "A") {
            return true;
        }
        if (lbl === "R") {
            return false;
        }

    }
    return false; // unreachable
}

function parseLineP2(line: string) : [string, Nodetor] {
    const [key, body, _] = line.split(/[{}]/);

    let prev: Nodetor;
    let root: Link = null;
    body.split(",").forEach(p => {
        const pcs = p.split(":");
        let cur;
        cur = new Nodetor(pcs[0], null, null);

        if (pcs.length > 1) {
            cur.if_true = new Nodetor(pcs[1], null, null);
        }

        if (prev && typeof prev != "string") {
            prev.if_false = cur;
            if (!root) {
                root = prev;
            }
        }
        prev = cur;
    })


    return [key, root!];
}

function parseLine(line: string) : [string, Functor] {
    const [key, body, _] = line.split(/[{}]/);

    let prev: Functor | string;
    let func: Functor | null = null;
    body.split(",").forEach(p => {
        const pcs = p.split(":");
        let cur;
        if (pcs.length > 1) {
            cur = new Functor(pcs[0], pcs[1], "");
        } else {
            cur = pcs[0];
        }
        if (prev && typeof prev != "string") {
            prev.if_false = cur;

            if (!func) {
                func = prev;
            }
        }
        prev = cur;
    });

    return [key, func!];
}

let lines: string[];
let specs: string[];

/*
lines = [
"px{a<2006:qkq,m>2090:A,rfg}",
"pv{a>1716:R,A}",
"lnx{m>1548:A,A}",
"rfg{s<537:gd,x>2440:R,A}",
"qs{s>3448:A,lnx}",
"qkq{x<1416:A,crn}",
"crn{x>2662:A,R}",
"in{s<1351:px,qqz}",
"qqz{s>2770:qs,m<1801:hdj,R}",
"gd{a>3333:R,R}",
"hdj{m>838:A,pv}"]
*/

/*
specs = [
"{x=787,m=2655,a=1222,s=2876}",
"{x=1679,m=44,a=2067,s=496}",
"{x=2036,m=264,a=79,s=2244}",
"{x=2461,m=1339,a=466,s=291}",
"{x=2127,m=1623,a=2188,s=1013}",
]
*/
const allLines = fs.readFileSync('input_day_19.txt', 'utf-8').split('\n');
lines = [];
while (true) {
    let l = allLines.shift()!;
    if (l == "") {
        break;
    }
    lines.push(l);
}
/*
allLines.pop();
specs = allLines;

let r: Record<string, Functor> = {};
lines.forEach(l => {
    let f = parseLine(l);
    r[f[0]] = f[1];
})
*/


/*let spec_list = specs.map(l => {
    let [x,m,a,s] = [0,0,0,0];
    eval(l);
    return new Spec(x,m,a,s);
})

console.log(spec_list.filter(s => qualityAssure(s, r)).map(s => s.x+s.m+s.a+s.s).reduce((pv, cv) => { return pv + cv }, 0));
*/

let rn: Record<string, Nodetor> = {};

lines.forEach(l => {
    let f = parseLineP2(l);
    rn[f[0]] = f[1];
});

function traverseTree() {
    let toVisit: [Link, string[]][] = [[rn['in'], []]]
    let ranges = [];

    while(toVisit.length > 0) {
        let cur = toVisit.pop()!;
        let curN = cur[0]!;

        if (curN.is_terminal()) {
            if (curN.content == "A") ranges.push(cur[1]);
        } else if (curN.is_jump()) {
            toVisit.push([rn[curN.content], [...cur[1]]]);
        } else {
            toVisit.push([curN.if_true, [curN.content, ...cur[1]]]);

            //let flipped = curN.content.replace(">", "!").replace("<", "?").replace("?", ">").replace("!", "<") //LOL
            
           
            let flippedContent = curN.content[0]; 
            let op = curN.content[1];
            let num = parseInt(curN.content.slice(2));
            if (curN.content[1] == ">") {
                flippedContent += "<";
                flippedContent += (num+1); 
            } else {
                flippedContent += ">";
                flippedContent += (num-1); 
            }
         
        
            toVisit.push([curN.if_false, [flippedContent, ...cur[1]]]);
        }
    }
    return ranges;
}

function multThroughRanges(ranges: string[][]) {
    let tot = 0;

    ranges.forEach(range => {
        let accepted: Record<string, [number, number]> = {"x": [1, 4000], "m": [1,4000], "a": [1,4000], "s": [1,4000]}
        range.forEach(r => {
            let operatingOn = accepted[r[0]];
            let operator = r[1];
            let value = parseInt(r.slice(2));

            if (operator == ">") {
                operatingOn[0] = Math.max(operatingOn[0], (value+1));
            }

            if (operator == "<") {
                operatingOn[1] = Math.min(operatingOn[1], (value-1));
            }
        })

        let totForR = 1;
        Object.entries(accepted).forEach(([_, r]) => {
            totForR *= ((r[1] - r[0]) + 1);
        })

        tot += totForR;
    })

    console.log(tot);
}


let acc = traverseTree();

multThroughRanges(acc);





