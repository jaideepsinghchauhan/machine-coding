import { useCallback, useRef, useState } from "react";
import "./style.css";
import useBookSearch from "./useBookSearch";
import { Link } from "react-router-dom";
export default function InfiniteScroll() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);

  const { loading, books, hasMore, error } = useBookSearch(query, pageNumber);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  // learn useCallback and useRef before jumping on this
  // this useCallback is attached to ref and it gets new node element automatically from the ref html
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPageNumber((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className="main-container">
      <Link to="/" className="text-blue-600 hover:underline absolute top-1 left-1">
        ← Back to Home
      </Link>
      <div className="content-wrapper">
        <strong>Infinite Scroll</strong>

        <input
          type="text"
          placeholder="Search..."
          className="mt-5 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        {books.map((book: any, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastElementRef} key={book}>
                {book}
              </div>
            );
          }
          return <div key={book}>{book}</div>;
        })}
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
      </div>
    </div>
  );
}
