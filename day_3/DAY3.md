# Day 3

## Part One

A rather straight forward 'adyacency' test. Basically - find a number, create a box around it - check if any characters inside that box has a symbol.
Minor quirks to keep the box inside the bounds of the schematic.


## Part Two

Part two was very easy to solve with dictionaries - just piggy back the code from part one, and whenever you find a symbol, check if it's a gear, if it is a gear put it in a 'gearRecord' with the coordinates as a key. Any other part that found that symbol, adds themselves to the gearRecord.
At the end, just go through the gearRecord and multiply / add as required.

For a second I thought it was gonna be more complicated, but thank goodness for hash tables (Dictionaries, Records, ...or whatever you call them in your programming languge) :P 
