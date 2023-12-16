# Day 16

## Part One
We're back on maps!

This one requires a bit of thinking to get the moving algorithm right, but there aren't that many tricks or twists.

The only thing that was a bit deceiving, is that once you 'loop' you need to stop. I ended up defining a 'loop' as 'hitting a splitter again in a direction that would split'.

That means hitting a | or a - in a way that I'd get 2 beams, is tracked. This needs to support hitting them from either direction - i.e. if we hit | coming from the right, hitting it coming from the left means we're looping.

Honestly the hardest part was realizing that `Set<[number, number]>` in Typescript doesn't work as I'd have expected and that caused definitely some shennanigans.

The code is a bit messy and now I'm afraid of Part Two coming up with some bs that makes this code not really work.
