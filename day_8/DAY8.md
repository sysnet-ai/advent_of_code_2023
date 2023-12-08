# DAY 8

## Part One
Probably one of the simplest ones so far - just turn the input into a hash map (hehe, have I mentioned like 90% of interview questions can be solved by a hash map :P) - in the hash map keep the left and right in a tuple.
Once you have the hash map, you follow the instructions and index on whatever the current key is - check if L or R and take that value from the map.

Only devilish detail is to remember that the instructions repeat if needed, so toss in a `%` operator in there.

