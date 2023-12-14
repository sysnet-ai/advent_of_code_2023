# DAY 14 

## Part One

Relatively straightforward - The 'pushing all north' part is just a traversal and then push any found 'O's as far as we can.
If we do this row-wise we always have the right state in the upper rows, so we can continue down and do the same.

Counting the load is just do a traversal in the 'rolled' map and for each 'O' found, just add map.height - height_of_this_O to the
total load. 

## Part Two
... Ok, 1000000000 - This needs some mathing around :/
