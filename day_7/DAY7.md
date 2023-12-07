# DAY 7

## Part One

Today we playing poker.

For part one, we do a couple of things:

1.- Classify hands based on their value or 'type' (i.e. Five of a kind, four of a kind, ...)
    This mostly boils down to how many copies of the same letter / number with a couple of special cases for Full house and 2 pairs
2.- Then sorting them inside their own kind is just a matter of creating a good sorting function - which I messed up like 3 times :P 
```ts
    const specialSuits: Record<string, number> = {"A": 14, "K": 13, "Q": 12, "J": 11, "T": 10 };
    for (let i = 0; i < a[0].length; i++) {
        const ac = a[0][i];
        const bc = b[0][i];
        const fac: number =  specialSuits[ac] ?? parseInt(ac); 
        const fbc: number =  specialSuits[bc] ?? parseInt(bc); 

        if (fbc == fac) continue;
        return fbc - fac;
    }

    return 0;
```


## Part Two

Seems relatively straight forward ... but we'll see.

Plan 1 - Just skip the J's when counting, and then add them to the highest.
         Change the sort function so that J = 0
