import { Link } from "react-router-dom";
import MainList from "./MainList";


function AutoCompleteSearch() {
  
  return (
    <div className="p-8 flex justify-center items-center flex-col">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h2 className="text-2xl font-bold mt-4">AutoComplete Search</h2>

      <MainList />

    </div>
  );
}

export default AutoCompleteSearch;