# DAY 8

## Part One
Probably one of the simplest ones so far - just turn the input into a hash map (hehe, have I mentioned like 90% of interview questions can be solved by a hash map :P) - in the hash map keep the left and right in a tuple.
Once you have the hash map, you follow the instructions and index on whatever the current key is - check if L or R and take that value from the map.

Only devilish detail is to remember that the instructions repeat if needed, so toss in a `%` operator in there.


## Part Two

I guess you can just do it in "parallel" (so keep a list of all the current locations, and keep going forward untill all of them end in Z?)

I'm sure there's a trick I'm not seeing - ah, of course... it will just take too long.

Plan 2 - Some sort of 'flooding' or 'dynamic programming' algorithm, basically find the number of steps from every node to a final node and then find the least common multiple among them... or something mathy like that.


Ok - let's talk about over complicating things and using code to get to the solution, but not *produce* the solution.

I was a bit confused, I was sure the idea was to find loops and then count from the loops, but it was a rather complex approach and I was already going to look into graph algorithms - BUT - I decided to look a bit into what was happening.


So using the code I had, I digged a bit and found the following things
1. For each Start, there's only 1 End in their path - i.e. - AAA always finds ZZZ and NO OTHER 'Z' ending node. (So the paths of the ghosts don't cross).
1. Each start >> end takes the same amount of steps each time to repeat. So if AAA takes 12083 steps to find ZZZ, that loop will end in ZZZ again in step 24166 and so on.
1. With this information, the approach becomes a rather easy one: Find how many steps each start->finish takes, and then find the least common multiple of the 6 numbers.

I did the last part using this page: https://www.calculatorsoup.com/calculators/math/lcm.php - cause I was not gonna write a new one myself :P

And TADA! That worked - A good reminder that (1) Math saves lives and (2) Sometimes code can help you analyze your problem, rather than just provide the answer ;)
