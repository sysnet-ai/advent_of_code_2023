# DAY 4

Hoooot daaaamn got the first star and the second star with only one attempt B-)
Let's celebrate this one! 

## PART ONE
It boils down to: Split the line in winners and the numbers I have, create a Set with the winners, iterate through the ones I have with a filter.

Technically, instead of the `reduce()` I could've just return `2^(numbers_i_have.length-1)` and that would've still worked.
I guess is more elegant than a reduce with a condition, but whatevs.

## PART TWO

I thought for a second this was gonna get trickier, but a bit of tuple abuse made it straight forward:
1. Transform the lines in the scratchies into a tuple `[line, number_of_copies]`
2. Follow the same algorithm to find how many matches I have on the line
3. And then the 'cascading' part: For each match, add the number of copies of the current card to each of the subsequent cards:

```
// Card string, number of copies tuple
[Card 1 .... | ...., 1] // All of them start with 1
[Card 2 .... | ...., 1] 
[Card 3 .... | ...., 1]
[Card 4 .... | ...., 1]

// If we see 2 matches in Card 1, then we update the subsquent 2 Cards adding 1 to each of them, cause Card 1 only has 1 copy
[Card 1 .... | ...., 1] // We already scratched this one, we found 2 matches 
[Card 2 .... | ...., 2] // Card 2 and Card 3 get updated, each with +1 coming from Card 1
[Card 3 .... | ...., 2]
[Card 4 .... | ...., 1]

// Then if we scratch Card 2, and we find 1 match, we update Card 3 with a +2 (because we have 2 copies of Card 2, and each copy adds +1)
[Card 2 .... | ...., 2] // We scratch this card, 2 times, we find 1 match 
[Card 3 .... | ...., 4] // So we add +2 here
[Card 4 .... | ...., 1]

// Then if we see 1 match in Card 3, we update Card 4 4 times
[Card 3 .... | ...., 4] // We have 4 copies of this card, so we'd update any of the subsequent ones 4 times, let's say there's 1
[Card 4 .... | ...., 5] // So this gets +4

// ... and so on.

```

In the end we just look at how many copies in total we have, which we have been keeping as we do this:
```
[Card 1 .... | ...., 1] 
[Card 2 .... | ...., 2] 
[Card 3 .... | ...., 4]
[Card 4 .... | ...., 5]

1+2+4+5 = 12 total cards we scratched
```
