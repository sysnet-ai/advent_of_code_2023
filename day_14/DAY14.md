# DAY 14 

## Part One

Relatively straightforward - The 'pushing all north' part is just a traversal and then push any found 'O's as far as we can.
If we do this row-wise we always have the right state in the upper rows, so we can continue down and do the same.

Counting the load is just do a traversal in the 'rolled' map and for each 'O' found, just add map.height - height_of_this_O to the
total load. 

## Part Two
... Ok, 1000000000 - This needs some mathing around :/

ALRIGHT! We got it.

So first, some code for the cycles - I took the transposing code from yesterday and changed it slightly and *boom* rotation :), if you rotate and then move all the rocks 'north', is the same as moving them to the 'west'.

The complexity was - what's up with the 1000000000000 (too many zeroes?).
I figured at some point it would start repeating - just like with Day 8.

So, add a hashing function that turns the map into a number and keep a record. Once you find a duplicate, you will need some math:

- First, substract the the cycle when you found the repeat from the 1B - let's call that `C`
- Now, find the length of the repeating loop - call it `L`. Our record keeps track of at which cycle we found each hash value, so this is easy. Substract the current cycle from the one that we're finding in the record.
- `C%L` is the amount of cycles left from where you are right now.
- Calc the load after moving forward that amount of cycles.


Solving this one made me feel smort :nerd:
