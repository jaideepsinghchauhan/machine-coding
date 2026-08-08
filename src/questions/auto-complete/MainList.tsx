import { useEffect, useState } from "react";
import './style.css'

function MainList() {
const [data, setData] = useState<{ id: number; name: string }[]>([]);
const [searchTerm, setSearchTerm] = useState<string>("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [showData, setShowData] = useState(false);
const [cache, setCache] = useState<{ [key: string]: { id: number; name: string }[] }>({});

async function fetchData() {
    if(cache[searchTerm]) {
        setData(cache[searchTerm]);
        return;
    }

    setLoading(true);
    setError(null);
    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchTerm}`);
        const result = await response.json();
        console.log(result.recipes);
        setData(result.recipes);
        setCache(prev => ({...prev, [searchTerm]: result.recipes}));
    } catch (err) {
        setError('Failed to fetch data');
    } finally {
        setLoading(false);
    }
}
useEffect(() => {
    const timeoutId = setTimeout(() => {
        fetchData();
    }, 500); // Debounce the API call by 500ms

    return () => clearTimeout(timeoutId);
}, [searchTerm]);

return <div>
        <input 
         type="text" 
         className="search-input"
         value={searchTerm} 
         onChange={(e) => setSearchTerm(e.target.value)} 
         onFocus={() => setShowData(true)}
         onBlur={() => setShowData(false)}
         placeholder="Search..." />
        
        { error && <p className="text-red-500">{error}</p>  }
        {loading && <p>Loading...</p>}
        {showData && (  
            data.map((item, index) => (
                <div className="item" key={item.id}>{item.name}</div>
            ))
        )
        }
    </div>
}

export default MainList;