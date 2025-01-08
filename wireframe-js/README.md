# Wireframe-js

Event listeners and web components for `wireframe`.

## Web Components without Styles

### Inline Movement

In a row of inputs:
People expect east and west arrow keys to move focus in the direction of their text.

Left / Up keys move focus backwards in LtR text.
Left /Up keys move focus forwards in RtL text.

### Block Movement

In a grid / table of inputs:
People expect north and south arrow keys to move from one "row" of focasable content (ie a radio group) to a row interpreted as above or below the current row.

Up keys move focus "above" the current row.
Down keys move focus "below" the current row.
Focus is moved to the last focused element in the row.

### Nested Checkboxes

It's annoying but needs to be done. Checkboxes can be "indeterminate" which signal a descendant branch of checkboxes is not fully checked.

## Tabs

(stretch)

Change descendant content by a top level focus. Could be implemented with Pop API?

### Focus Indication ?

(stretch)

A ripple or fanout or animation of some kind that shows a person clicked on something correctly. This is heavily timebased and only for sighted individuals. 

### Infinite Scroll ?

(stretch) (build after multiple personal implementations)

Would be nice but highly tailored to downstream api (as in I cannot support every kind of api).
