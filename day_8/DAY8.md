# DAY 8

## Part One
Probably one of the simplest ones so far - just turn the input into a hash map (hehe, have I mentioned like 90% of interview questions can be solved by a hash map :P) - in the hash map keep the left and right in a tuple.
Once you have the hash map, you follow the instructions and index on whatever the current key is - check if L or R and take that value from the map.

Only devilish detail is to remember that the instructions repeat if needed, so toss in a `%` operator in there.


## Part Two

I guess you can just do it in "parallel" (so keep a list of all the current locations, and keep going forward untill all of them end in Z?)

I'm sure there's a trick I'm not seeing - ah, of course... it will just take too long.

Plan 2 - Some sort of 'flooding' or 'dynamic programming' algorithm, basically find the number of steps from every node to a final node and then find the least common multiple among them... or something mathy like that.
