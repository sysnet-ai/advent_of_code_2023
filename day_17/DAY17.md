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
