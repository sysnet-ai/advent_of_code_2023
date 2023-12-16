# Day 16

## Part One
We're back on maps!

This one requires a bit of thinking to get the moving algorithm right, but there aren't that many tricks or twists.

The only thing that was a bit deceiving, is that once you 'loop' you need to stop. I ended up defining a 'loop' as 'hitting a splitter again in a direction that would split'.

That means hitting a | or a - in a way that I'd get 2 beams, is tracked. This needs to support hitting them from either direction - i.e. if we hit | coming from the right, hitting it coming from the left means we're looping.

Honestly the hardest part was realizing that `Set<[number, number]>` in Typescript doesn't work as I'd have expected and that caused definitely some shennanigans.

The code is a bit messy and now I'm afraid of Part Two coming up with some bs that makes this code not really work.

## Part Two
Wait... that's it? I guess we can just brute force it and try every entry point? There aren't even that many (~400)

Ok... that worked (Had to do some minor fudging cause I got the loop wrong the first time... hehe :P)
But honestly I was expecting something brutal here - now I'm afraid of tomorrow cause Sundays have been hard :/ (Looking at you day 10!!)
