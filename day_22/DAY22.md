# Day 22

## Part One
Uff just reading the input tells you that is gonna be a hard one.

The plan right now:
- Parse the input and produce a 3D array similar to the one in the explanation, where each brick gets a letter.
- From Bottom to Top, figure out which bricks still need to fall.
    - Maybe this is easier using a 2D array of heights? (Nah, I don't think this is useful in any way)
- From Top to Bottom, check each brick for support.
- You can disintegrate:
    - Bricks supporting 0 other bricks
    - Bricks supporting bricks with multiple supports
