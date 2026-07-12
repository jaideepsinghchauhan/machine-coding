import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query: any, pageNumber: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);
    
  useEffect(() => {
    setBooks([]); // this is added , when we change query our entire apppended array becomes fresh empty
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const controller = new AbortController();

    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      signal: controller.signal, //this is what actually connects axios to the controller
    })
      .then((res) => {
        console.log(res.data.docs.length);
        setBooks((prev: any) => {
          return [
            ...new Set([...prev, ...res.data.docs.map((b: any) => b.title)]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.name === "CanceledError") {
          console.log("Request cancelled");
        } else {
          setError(err);
          console.log("Error fetching books:", err);
        }
        setLoading(false);
      });

    return () => {
      controller.abort(); // called automatically before the NEXT effect run, or on unmount
    };
  }, [query, pageNumber]);

  return { loading, books, hasMore, error };
}
