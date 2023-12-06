# Day 6

## Part 1
This reads suspiciously easy :suspicious_eyes_emoji:

Plan 1 - Just run from 1 to N until we no longer can beat the record.
We just do `i*(N-i) > R` and then stop the first time it no longer beats tit?
Really?

<... goes and codes that ...>

Ok... that works... YAY! 

## Part 2
Haven't read the text, but I'm expecting some grade A BS :/
Ah there it is... big numbers of course.

So now instead of just running - we use some math, you only need to find the minimum number required to break the record.
Once you find that you can just exploit the fact that you're just doing multiplications over a range:

i.e. `i*(N-i) > R` once the left hand side is greater than R (call it i_min) then it will continue being bigger, until you get to
`i = (N-i_min)`.
This is easier to explain with a bit of a table:
```
N = 7
R = 9

// The values for i, and inside the table (i*(N-i))
i |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  | 
---------------------------------------------------
  |  0  |  6  | 10  | 12  |  12 | 10  |  6  |  0  |

```
The function creates a symetrical output. So as long as we find the first number that fulfills the record breaking, we can find the last number
that will break it. And by doing some arithmetic we can find the total different numbers, without having to actually run through all of them.

Math - saves lives ;)
