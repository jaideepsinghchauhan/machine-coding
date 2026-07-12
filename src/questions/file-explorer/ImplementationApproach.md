📋 File Explorer — Step-by-Step Implementation Approach
Step 1: Static Base Structure
Rendered a single Home folder icon at the top, hardcoded, to confirm the lucide-react Folder icon renders correctly with proper styling (color, size, inline alignment with text).
Step 2: Manually Added Sub-Items
Added 3 sub-folders manually (hardcoded JSX, no loop) — e.g., separately writing out Movies, Music, Documents as individual <div> elements with the folder icon — just to visually confirm nested indentation (pl-5) looked correct.
Step 3: Converted to a Simple String Array + Loop
Refactored the 3 hardcoded items into a plain array: ['Movies', 'Music', 'Documents']
Used .map() to loop through and render each one dynamically, instead of repeating JSX manually — reducing duplication and setting up the pattern needed for recursion.
Step 4: Converted Strings to Objects (Preparing for Nesting)
Changed the flat string array into an array of objects, each with a name and an empty folders array:
tsx

Collapse
Copy
1
[{ name: 'Movies', folders: [] }, { name: 'Music', folders: [] }, ...]
This structural change was necessary to eventually support nested sub-folders — a plain string can't hold children, but an object can.
Step 5: Rendered One Level of Nesting
Populated the folders arrays with actual nested objects (e.g., Movies containing Action and Comedy)
Looped through this one additional level manually (not yet fully recursive) to confirm nested rendering and indentation worked correctly for a single extra layer.
Step 6: Extracted Recursive Component
Created a separate MyFolder component that renders itself for any nested folders array — turning the one-level-manual loop into a fully recursive structure that works for any depth of nesting, not just one hardcoded level.
Step 7: Added Expand/Collapse Interactivity
Introduced useState(isExpanded) inside MyFolder, so each folder instance manages its own independent expanded/collapsed state
Added ChevronRight (collapsed) / ChevronDown (expanded) icons from lucide-react, toggled via onClick
Made child folder rendering conditional on isExpanded, so clicking a folder actually shows/hides its contents — not just a cosmetic icon change

YT LINK : https://www.youtube.com/watch?v=6UU2Ey4KZr8
