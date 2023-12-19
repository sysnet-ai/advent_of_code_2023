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
