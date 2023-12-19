# DAY 18

## Part One
Aaaand we're back to paint buckets :P

I ended up just ripping my own code from Day 10 and adjusting it slightly.

Basically - Follow the instructions, count the places we dug.
Run the paint bucket algorithm, add the size of the bucket (there's only 1 valid contiguous space).

No biggie - however, the 'hex' seems very ominious and I'm sure is gonna be a problem for part Two...

## Part Two

Talk about a Chekov's gun with those hex numbers.

So the approach for part one would never work, we'd run out of memory immediately. So Math to the rescue.

First idea - The perimeter is trivial to calculate as we're going throug the instructions.

For the insides, we'll keep a list of the points ordered by Y, and we will traverse that list, every time we find new points 'under' we can calculate the area of the squares formed.
I think it is relatively simple, but I might be wrong and there might be a few special cases that break the whole thing.

We'll see...




