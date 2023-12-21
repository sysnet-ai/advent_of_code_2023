# DAY 20


## Part One

This has a couple of complicated parts, the parsing isn't trivial and then following the pulse is I think just a BFS (?)

Also, I'm expecting the second part to ask for "what happens if you do 10000000000000000" pulses - which is gonna require figuring out when it starts repeating and do something similar to Day 8.

So I added a couple of functions to check for that.

However 1000 seem relatively small so we're just gonna bruteforce it.

On the first approach I was using 'true' for High Pulse and 'false' for Low Pulse, but we also need 'DEAD' (in the case you pass a High Pulse to one of the flippers, they do nothing and we need to find a way of codifying that, so we moved to an Enum)

After some minor tinkering here and there we got it to spit the exact same 'log' as the example.

*aaaaand...* WE GO IT! 

Quite a bit of code but very little tinkering post the first approach - NICE! :) 

## Part Two

Wait?... This seems suspiciously easy :/ I'm expecting some trickery, cause it can't be *that* easy.
Are they just mocking me for trying to preempt the second parts? IS THAT IT AOC GODS!?

LOOOOOL... Apparently brute force wont work here, and I have *NO IDEA* what would :/ - hahaha well played AoC gods, well played.
