# 📋 Multi-Step Tab Form — Step-by-Step Implementation Approach

## Step 1: Static Tab Layout

- Created the main `MultiStepForm` component with hardcoded tab headings (Profile, Interests, Settings) and an empty content area below.
- No logic yet — just confirming the visual layout of tab headers + content body looks correct.

## Step 2: Create Empty Child Components

- Created separate empty components for each tab: `Profile`, `Interests`, `Settings` — each just returning a placeholder div with the tab name.
- Imported all three into the parent `MultiStepForm`.

## Step 3: Build a Tabs Configuration Array

- Instead of rendering tabs manually, created a configuration array:
  ```tsx
  const tabs = [
    { name: "Profile", component: Profile },
    { name: "Interests", component: Interests },
    { name: "Settings", component: Settings },
  ];
  ```
- Looped through this array using `.map()` to render tab headings dynamically — adding a new tab is now just one object in the array, zero JSX duplication.

## Step 4: Tab Switching Logic

- Added `activeTab` state (index-based) to track which tab is currently selected.
- Used the `activeTab` index to dynamically resolve which component to render:
  ```tsx
  const ActiveTabComponent = tabs[activeTab].component;
  ```
- Attached `onClick` on each tab heading to update `activeTab` to that tab's index.
- Confirmed clicking different tabs correctly swaps the rendered content.

## Step 5: Active Tab Visual Indicator

- Added `data-active` attribute on each tab heading div, set dynamically:
  ```tsx
  data-active={activeTab === index ? "true" : "false"}
  ```
- Styled the active state via CSS attribute selector:
  ```css
  .tab-container div[data-active="true"] {
    background-color: red;
  }
  ```
- Alternative approaches considered: conditional className, CSS variables, Tailwind dynamic classes — all valid, chose data attributes for learning purposes [1].

## Step 6: Create Shared Form State

- Defined a single `data` state object in the parent containing all fields across all tabs:
  ```tsx
  const [data, setData] = useState({
    name: "Jaideep",
    age: 33,
    email: "...",
    interests: ["music", "coding"],
    theme: "dark",
  });
  ```
- Spread this data as props to the active component: `<ActiveTabComponent {...data} />`
- This keeps the parent as the **single source of truth** for all form data across all tabs.

## Step 7: Build Profile Tab (Text Inputs)

- Added text inputs for `name`, `email`, `age` inside the `Profile` component.
- Used the HTML `name` attribute on each input matching the state key (e.g., `name="email"`).
- Created a single `handleChange` in the parent that reads `e.target.name` and `e.target.value` to update the correct field:
  ```tsx
  setData((prev) => ({ ...prev, [name]: value }));
  ```
- **Key learning:** Using the input's `name` attribute eliminates the need to pass hardcoded string identifiers manually per input — the event itself tells you which field to update [1].

## Step 8: Build Settings Tab (Radio Buttons)

- Added radio buttons for theme selection (Dark/Light).
- Both radios share `name="theme"` but have different `value` attributes (`"dark"`, `"light"`).
- Used `checked={theme === "dark"}` for controlled radio behavior.
- **Key learning:** Radio buttons require explicit `value` attributes — without them, `e.target.value` returns `"on"` (useless). The same parent `handleChange` works without modification since radios also have `name` + `value` on `e.target` [1].

## Step 9: Build Interests Tab (Checkboxes)

- Added checkboxes for interests (Music, Coding).
- Checkboxes can't use the same simple `[name]: value` pattern as text/radio, because interests is an **array** (add/remove items), not a single value replacement.
- Created a local `handleInterests` function inside the Interests component that:
  - Reads `e.target.name` (the interest name) and `e.target.checked` (boolean)
  - If checked: adds the interest to the array
  - If unchecked: filters it out
  - Passes a fake event object back to the parent's `handleChange`: `{ target: { name: "interests", value: updatedArray } }`
- **Key learning:** Different input types sometimes need local pre-processing before syncing to a shared parent handler — checkbox array logic is a common example [1].

## Step 10: Add Navigation (Prev/Next/Submit)

- Added three buttons that conditionally render based on `activeTab`:
  - **Prev:** only visible when `activeTab > 0`
  - **Next:** only visible when `activeTab < tabs.length - 1`
  - **Submit:** only visible on the last tab (`activeTab === tabs.length - 1`)
- Used `<button>` elements (not `<input>`) since buttons can contain text/icons as children.
- Submit button calls `e.preventDefault()` and logs the final `data` object.
- **Common bug caught:** `setActiveTab(next => next = 1)` assigns instead of incrementing — must be `prev => prev + 1`.

---

YT Link : https://www.youtube.com/watch?v=UTky8eipUhA
