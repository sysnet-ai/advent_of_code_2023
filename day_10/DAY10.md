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