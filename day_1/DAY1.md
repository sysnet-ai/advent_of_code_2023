# Day 1

## First Part
- The first part was very easy, it was just running through the function and finding digits. Always keeping track of the last digit seen, and only a small tracker to know when the first one was already found:

```ts
    const charCodeZero = "0".charCodeAt(0);
    const charCodeNine = "9".charCodeAt(0);
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
```
Nothing too sofisticated

## Secon Part
The second part got really funky and required much more thinking and multiple attempts (although the last attempt was due to a typo, oh well :P)

At first I thought I could just run search replace on the strings and be done with it - but a string like "twone" would completely break that approach, because 'one' would be replaced, when 'two' was the correct answer.

After some fiddling, I went with some basic substring matching:
```ts
    while (subInx_s < funnyString.length) {
        subs = funnyString.substring(subInx_s, subInx_e+1); 

        // Find any number strings that could be 
        // a match for the current substring
        matching = nums.filter((ns) => {
            return ns.startsWith(subs);
        })

        // No matches, that means this substring
        // isn't gonna become a number.
        if (matching.length == 0) {
            digitified += funnyString[subInx_s];
            matching = [];
            subs = "";
            subInx_s += 1;
        } else if (matching.length == 1 && matching[0] == subs) {
        // Perfect match!! Change it for a number and keep going
            digitified += numToDigit(subs);
            matching = [];
            subs = "";
            subInx_s = subInx_e;
            subInx_e = subInx_s + 1;
        } else {
        // Partial match, this *could* become a match in the future
        // so keep going unless we ran out of space
            subInx_e += 1;

            if (subInx_e > funnyString.length) {
                digitified += funnyString.substring(subInx_s);
                break;
            }
        }
    }
```

This is much more sophisticated than what I was expecting for day 1 - So it was fun :) 
