# DAY 17

## Part One
This is A\* right? Finally! Haha.

So the plan is to use A\* aiming to minimize heatloss, and then while doing expansion avoid adding the 4th block in the same direction.

And that should be it, right? The heuristic would be the manhattan distance.


Ok that worked - we didn't use the heuristic even :D.
Had to fuddle a bit with the 'visited' hashtable to account for a few things, for example
visiting a node coming from the north is not the same as visiting it while coming from the east
because the nodes you can visit afterwards are different depending on the direction and how many
times you have moved.

The code isn't even that messy given all the fiddling.

Let's see what part two brings :P - oh and first day we need an external package, because I ain't programming no priority q myself

## Part Two
Ok, this seems not too bad - just changing the expansion function to force movement in the same direction and allow
up to 10?

Yup pretty much that's it - a minor adjustment because it says it needs to move 4 *even before stopping* so only accept arrivals to the target that have been moving more than 4.

I thought the code was messy, but adding these new requirements was relatively easy - so I guess it wasn't too bad. Definitely some extraction into functions and better variable naming, but all in all not too shabby.

Feeling like aStar :D! am I rite?
