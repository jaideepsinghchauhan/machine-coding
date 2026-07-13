📋 OTP Input — Step-by-Step Implementation Approach
Step 1: Static Inputs
Created a fixed number of <input type="text"> elements (e.g., 5 hardcoded inputs) to confirm basic rendering and layout works.
Step 2: Dynamic Input Count via Array
Replaced hardcoded inputs with Array.from({ length: otpDigitCount }) — allowing the parent component to decide how many OTP boxes to render via a prop.
Used .map() to loop through and render each input dynamically.
Step 3: Controlled Input with State
Added useState to track each input's value in an array.
Wired up onChange to capture user input and update the correct index in the state array.
Step 4: Restrict to Single Digit Only
Used val.slice(-1) inside onChange — this ensures that even if a user somehow enters multiple characters, only the last character is kept.
Added isNaN(val) check to reject non-numeric input entirely.
Why slice(-1) instead of maxLength={1}? maxLength prevents typing a new digit when one already exists (user has to manually clear first). slice(-1) allows overwriting — if the user types a new digit, it simply replaces the old one, which is the expected UX for OTP inputs.
Step 5: Auto-Focus Next Input on Entry
Stored a ref array (useRef<(HTMLInputElement | null)[]>([])) to hold DOM references for each input box.
Used callback refs (ref={(el) => { inputRef.current[index] = el }}) inside .map() to populate the array — since a single useRef can't be shared across multiple elements.
After a digit is entered, called inputRef.current[index + 1]?.focus() to automatically move focus to the next box.
Added guard: only shift focus if val.trim() is truthy (don't shift on empty/clear) and index < otpDigitCount - 1 (don't shift past the last box).
Step 6: Auto-Focus First Input on Mount
Added useEffect with empty dependency array to call inputRef.current[0]?.focus() on component mount — so the cursor is ready in the first box immediately, without the user needing to click.
Step 7: Backspace Navigation
Added onKeyDown handler to detect Backspace key press.
Key check: !e.target.value — this is critical:
If the current input has a value, pressing Backspace should clear that value first (default browser behavior handles this via onChange), NOT jump to the previous input.
Only if the current input is already empty AND Backspace is pressed, then move focus to the previous input (inputRef.current[index - 1]?.focus()).
Why this order matters: Without the !e.target.value check, pressing Backspace would simultaneously clear the current input AND jump to the previous one — effectively skipping a box and creating confusing UX.

YT Link: https://www.youtube.com/watch?v=usVdJONI99k
