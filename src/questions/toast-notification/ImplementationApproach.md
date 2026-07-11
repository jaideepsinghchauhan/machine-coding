Overview
This document tracks the step-by-step evolution of the Toast Notification implementation — from a static, single-toast proof of concept to a fully functional multi-toast system with auto-dismiss and manual close support.

Step-by-Step Approach
Step 1: Static Container, Fixed Position
Created a .toast-container div and used CSS position: fixed (not display: fixed, which is invalid) to pin it to a corner of the screen (top, right).
At this stage, the toast itself was hardcoded/static — no show/hide logic yet.
Step 2: Show/Hide Logic (Single Toast)
Introduced basic conditional rendering to show/hide the toast based on a boolean or similar simple state.
No dynamic content yet — just proving the toggle mechanism worked.
Step 3: Array-Based State (Single Item Only)
Switched to storing toast data in an array via useState, but only ever allowed one item in the array at a time (each new toast replaced the previous one).
Introduced a remove function to clear the toast (setToasts([])).
Step 4: Multiple Toasts Support
Updated state logic to append new toasts instead of replacing (setToasts(prev => [...prev, newToast])), allowing multiple toasts to stack and render simultaneously.
Each toast rendered via .map(), keyed by a unique id (generated via new Date().getTime()).
Step 5: Manual Removal by ID
Implemented handleClose(id) to filter out a specific toast by its id when the user clicks the close (×) button — rather than clearing all toasts.
Step 6: Auto-Dismiss via setTimeout
Added setTimeout(() => handleClose(id), 5000) inside handleAdd, so each toast automatically removes itself after 5 seconds, independent of other toasts.
Step 7: Tracking Timeouts with useRef (Cleanup Handling)
Recognized an edge case: if a user manually closes a toast before its 5-second timer fires, the timeout would still eventually fire and call handleClose(id) again on an already-removed toast (harmless here since .filter() is idempotent, but wasteful and not clean).
Introduced useRef to store a map of toast id → timeout reference, allowing us to clearTimeout() and clean up properly when a toast is manually closed early.
Chose useRef over useState for this because timeout references are not UI-driving data — updating them shouldn't trigger a re-render.
