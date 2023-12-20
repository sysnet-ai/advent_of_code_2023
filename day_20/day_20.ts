
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
            if (this.ins > 1) {
                throw("This should never happen!");
            }
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
                Object.entries(this.receivedPulses).forEach(([k, r]) => {
                    if (r == PULSE.LOW) {
                        return PULSE.HIGH;
                    }
                });
                return PULSE.LOW;

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
    const into_ms = into.trim().split(',');
    conx[mod.name] = [mod, into_ms]
}

function pulse(conx: Record<string, [Module, string[]]>) {
    let [curM, toPulse] = conx['roadcaster']; // hehe roadcaster

    while (toPulse.length > 0) {
    }
}

const lines = [
"broadcaster -> a",
"%a -> inv, con",
"&inv -> b",
"%b -> con",
"&con -> output"]

const conx: Record<string, [Module, string[]]> = {}; 
lines.forEach(l => parseLine(l, conx));

Object.entries(conx).forEach(([k, [_, outs]]) => {
    outs.forEach( o => { 
        if (conx[o]) conx[o][0].addInput(k)
    });
})



console.log(conx);
