# Though behind implementation

first thign is we need to fetch api data and store
then show the data
then we need to create an input and store that in a use state 
then we need to create a useeffect which will re run on the search term update and call fetch
now we need to add a debounce and then see if it works
next in the end we will add caching and store the response in a cache ad return taht without api call

gotchas is how to update an objects
setCache(prev => ({...prev, [searchTerm]: result.recipes}));