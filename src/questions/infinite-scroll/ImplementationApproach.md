Infinite Scroll — Implementation Approach
Step 1: Basic Search Input + Custom Hook Setup
Create a useBookSearch(query, pageNumber) hook that returns { loading, books, hasMore, error }
Component holds query and pageNumber as state, passes them into the hook
Input's onChange updates query and resets pageNumber back to 1 (new search = start fresh)
Step 2: Fetch Data with Axios
Inside the hook's useEffect (dependent on [query, pageNumber]), call the API using axios
On success: append new results to existing books state
Set hasMore based on whether the API returned any results
Step 3: Cancel Stale Requests (AbortController)
Create a new AbortController() inside the effect (fresh instance per request)
Pass controller.signal into the axios config
Return a cleanup function calling controller.abort() — this cancels the previous request automatically whenever query/pageNumber changes again, or the component unmounts
Why AbortController over debounce here: Debounce delays firing the request; AbortController cancels a request already in flight. Both can be used together in production, but AbortController alone solves the specific race-condition problem (stale responses overwriting fresh ones)
Step 4: Handle Errors
Wrap the axios call in .catch()
Distinguish between a genuine error vs. a cancelled request (check axios.isCancel(err) or err.name === "CanceledError") — cancellations aren't real errors and shouldn't set error state
Set loading to false in both .then() and .catch() to avoid getting stuck in a permanent loading state
Step 5: Reset Books on New Search
Separate useEffect with [query] as the only dependency
Calls setBooks([]) whenever the search term changes — ensures old results don't mix with a brand new search
Step 6: Load More on Scroll (IntersectionObserver + Callback Ref)
Use a useRef to persist the IntersectionObserver instance across renders (observer.current)
Create a callback ref (via useCallback) and attach it to the last book element in the rendered list
Inside the callback ref:
Skip setup if currently loading (avoid duplicate observers mid-fetch)
Disconnect the previous observer (cleanup, since the "last element" changes every time new books load)
Create a new IntersectionObserver, watching for when the element becomes visible
On intersection (and if hasMore is true), increment pageNumber — this automatically triggers the hook's fetch effect for the next page
Why use a callback ref instead of useRef + useEffect?
A callback ref is called directly by React at the exact moment the target DOM element mounts or unmounts — no dependency array guessing required
With a plain useRef, you'd need to manually add books to a useEffect's dependency array to indirectly detect "the last element probably changed" — functionally works, but less precise/explicit
Callback refs are the more conventional, widely-recognized pattern for this exact problem (seen in most infinite-scroll implementations), making the code more instantly recognizable to other developers/interviewers
Both approaches are valid — callback ref is simply the more idiomatic choice for this specific pattern

YT Link: https://www.youtube.com/watch?v=NZKUirTtxcg 
