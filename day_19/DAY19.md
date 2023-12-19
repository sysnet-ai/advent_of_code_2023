# DAY 19

## Part One
Seems the harder part of part one is to correctly parse and organize the data.
I ended up creating a "Functor" to make it easier to keep everything under control and take advantage of some of the data format (i.e. the true paths always return a string for example)

While looking into this, I figured part two is gonna have some large numbers and require some 'collapsing' of the conditions (i.e. "X is accepted IFF `<X` or `>Y`") but I figured I'd go for part one before thinking too much about this.


## Part Two
Aaaaaand there it is... haha, I'm starting to get good at preemting the Part two's haha.

Plan:
BFS and keep track of the "splits" that happen in each node (i.e. `>X` or `<Y`), and when an "A" is found "count" the numbers valid in each split and multiply them.

It does require changing like... all the code thou :/

But that worked!

The code needed to change some, but the basic concepts stayed the same so I could copy paste / reuse some bits and pieces.

Got a bit flusttered at one point, but then realized that my 'flipping' code (for when you go down the 'if_false' route) required to also alter the number:

`m<5` - The false condition for this is `m>4`, because 5 isn't `<5` but outside of that relatively straight forward once the main 'binary search' style idea was there.

Now back to day 18 part two :/
