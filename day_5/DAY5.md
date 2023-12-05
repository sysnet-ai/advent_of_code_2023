# Day 5

## Part One
Ok, they really brought it today - so making the notes *before* writing code to organize the thoughts.

At first I thought this was gonna be some sort of pathfinding thing, but fortunately I was wrong.

It seems just a bunch of array mapping with a twist.

Plan 1 - for each of the mappings in the almanac:
- Create a Dictionary that maps the numbers from A to B. This will require a loop and some imagination.
- And then traverse them in order?
- ???
- Profit? (I guess just do a min(all_the_locations_found)?

This seems easy on the surface, I'm sure I'm gonna get smoked.

[... Goes and tries this in code...]
[... comes back 45 min later ...]

### WRECKED!
So this worked perfectly for the example... *BUT* the input text completely destroyed the approach, because you run out of memory - as they're using gigantic numbers.

<... CURSES IN MULTIPLE LANGUAGES... >


Plan 2 - Basically the same as before, but create ranges. This is actually "easier", but is kinda dumb that I only saw it until now.
Now we do some math trickery and that should work.

And that worked... Took 10mins to change it (I knew this was gonna happen so I made the code heavily modular with no repetition and that was smort! :D)

## Part Two
