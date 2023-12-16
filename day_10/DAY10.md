# DAY 10


# Part One

Ok, I guess the easy ones are over :/ - This one is rather complex to even get rolling.

I think a 'flood' approach is the best? - Basically:
1. Parse the Map
1. Find the 'S'
1. From there, check all 4 positions around (N, S, E, W)
1. Replace those new positions with numbers based on the distance that has been traversed so far.
1. If you find an incompatible pipe, a '.' or a number, don't add them. (A number is actually impossible given the pipes, right? The never bifurcate)
1. Once you have no positions to investigate you're done?

Well.. this works :D!

We needed some code to figure out 'what the snake is' and is a bit verbose, but the flooding algorithm worked like a charm :D

# Part Two

Hmmm... feels a bit convoluted, but I think I have a simple plan taking adavantage that we're replacing all loop-belonging pipes with X:

1. Do a 'sweeping' pass horizontally, every time you find an X toggle in/out.
1. Mark "IN" tiles with an H 
1. Do a 'sweeping' pass vertically
1. If you find an H and it is also 'IN' vertically, count it.
1. Profit??

We'll see...

Ok turns out that is incorrect - You need to keep track of the type of segment you're on, if you're already on the pipe, and you see another pipe that is continuation then you shouldn't toggle.


Wweeeeeeell... it took multiple days, but we ended up doing a few things:
1. Expand the map to twice the size, that's needed for the 'squeezing' part (I got a hint from Reddit for this one).
1. After you do the expansion, differentiate between "originally empty" (`.`) and "empty after the expansion (`*`)
1. After that, just create a 'simple' paint bucket algorithm, like the one for paint brush.
    1. Basically find an empty spot, and add all the empties that are adjacent to it and continue doing that in a kind-of Breadth First search algorithm 
    2. Then for each of this 'blobs', check if at any point they're adjacent to the edges of the map, discard them.
1. Once you have found viable blobs (i.e. they never touch the edges), only count the spaces inside those blobs that have a "." (i.e. only the original empties, not the ones from the expansion). 


The code is super messy and I know there's multiple places where we could've been more elegant / tighter - BUT... It's AoC baby! We move fast and write shitty code :P
