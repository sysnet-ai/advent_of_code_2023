# Day Thirteen

## Part One

After the comple whip of Day 12, we're back to something chill.

The first approach was a bit simplistic, but with a little bit of adjustment we got there.

The algorithm is basically:
1. Traverse the map row by row
1. If I find that the current row is the same as the previous row:
    1. Create 2 indexes
    1. One of these indexes runs forward, the other runs backwards
    1. Compare each of the rows at these indexes, if they're the same, continue, if they're different go back to the previous loop 
    1. If we reach either edge, we return the index at which we started this sub-loop


Step (2)(iii) is necessary, because you could find a situation where it is something like abaabba - it is not symetrical at 'aa', but it is simetrical at 'bb' so you have to continue checking the other rows even after suspecting symmetry.


If we can't find any symmetry on the rows, we transpose the little map and we try again (that way the code is the same and transposing is trivial so less space for mistakes ;))

Let's see how bad is part two :P 


## Part Two

... Ugh... this reads pretty dire.

The approach I'm thinking is basiclly keep the same algorithm, but add a quick twist:
If we find symmetry, and we didn't do any repairs - reject that.
While we're doing the symmetry check, if there's a line that would become symmetric by doing only one change - do it.

Only accept those with 1 change done - keep everything else.

*AAAAND* that works... I'm surprised, I was expecting something to break along the way and with the exception of some minor fudging it pretty much worked out of the box.

I guess a good thing of the implementation is that I don't actually change the string, the "repair" only means "I will forgive 1 difference"
