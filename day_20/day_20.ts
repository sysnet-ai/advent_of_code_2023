import * as fs from 'fs'

enum PULSE {
    LOW,
    HIGH,    
    DEAD
}


class Module {
    name: string;
    mtype: string;
    receivedPulses: Record<string, PULSE> = {}; 
    isOn: boolean = false;
    ins: number = 0;

    constructor(n: string, mt: string) {
        this.name = n;
        this.mtype = mt;
    }

    addInput(n: string) {
        this.ins++;

        if (this.mtype == "b") {
            throw("This should never happen!");
            return;
        }

        if (this.mtype == "%") {
            // This is ok I guess?
            return;
        }
        this.receivedPulses[n] = PULSE.LOW;
    }

    isBackToInitial() {
        switch(this.mtype) {
            case "b": return true;
            case "%": return !this.isOn;
            case "&": return Object.entries(this.receivedPulses).filter(([k, r]) => r == PULSE.HIGH).length == 0;
        }
    }

    processPulse(comesFrom:string, value: PULSE) : PULSE{
        switch(this.mtype) {
            case "b":
                return PULSE.LOW;

            case "&":
                this.receivedPulses[comesFrom] = value;
                let v = PULSE.LOW;
                Object.entries(this.receivedPulses).forEach(([k, r]) => {
                    if (r == PULSE.LOW) {
                        v = PULSE.HIGH;
                    }
                });
                return v;

            case "%":
                if (!value) {
                    this.isOn = !this.isOn;
                    return this.isOn ? PULSE.HIGH : PULSE.LOW;
                }
        }
        return PULSE.DEAD;
    }
}

function parseLine(line: string, conx: Record<string, [Module, string[]]>) {
    let [mod_n, into] = line.split('->');
    mod_n = mod_n.trim();
    const mod = new Module(mod_n.slice(1), mod_n[0])
    let into_ms = into.split(',');
    into_ms = into_ms.map(s => s.trim());
    conx[mod.name] = [mod, into_ms]
}

function pulse(conx: Record<string, [Module, string[]]>) : [number, number] {
    let [curMod, conexions] = conx['roadcaster']; // hehe roadcaster
    let toPulse: [PULSE, string, string[]][] = [[PULSE.LOW, curMod.name, conexions]]
    let lowPulses = 0, highPulses = 0;

    lowPulses++; // Account for the button being pressed
    while (toPulse.length > 0) {
        let nextPulses: [PULSE, string, string[]][]  = [];
        toPulse.forEach(([pulseValue, fromName, toConx]) =>  {
            toConx.forEach( conexionName => {
                //console.log(fromName, "-", pulseValue == PULSE.LOW ? "low" : "high", "->", conexionName);

                if (pulseValue == PULSE.LOW) lowPulses++;
                if (pulseValue == PULSE.HIGH) highPulses++;

                let [cm, toc] = conx[conexionName] ?? [undefined, undefined];
                if (cm) {
                    let nv = cm.processPulse(fromName, pulseValue);
                    if (nv != PULSE.DEAD) nextPulses.push([nv, cm.name, toc]);
                }
            })
        })

        toPulse = nextPulses;
    }

    return [lowPulses, highPulses];
}

/*
const lines = [
"broadcaster -> a",
"%a -> inv, con",
"&inv -> b",
"%b -> con",
"&con -> output"]
*/

const lines = fs.readFileSync('input_day_20.txt', 'utf-8').split('\n');
lines.pop();

const conx: Record<string, [Module, string[]]> = {}; 
lines.forEach(l => parseLine(l, conx));

Object.entries(conx).forEach(([k, [_, outs]]) => {
    outs.forEach( o => { 
        if (conx[o]) conx[o][0].addInput(k)
    });
})

let b = false;
let i = 1000;
let lp = 0, hp = 0;
while (i > 0) {
    i--;
    let [l, h] = pulse(conx);
    lp += l;
    hp += h;

    b = Object.entries(conx).filter(([_, [mod, __]]) => {
        return !mod.isBackToInitial();
    }).length == 0;
}


console.log(lp*hp);
