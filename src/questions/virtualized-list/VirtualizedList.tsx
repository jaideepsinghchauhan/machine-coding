import { Link } from "react-router-dom";
import MainList from "./MainList";

function VirtualizedList() {
  const data : string[] = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);
  
  return (
    <div className="p-8 flex justify-center items-center flex-col">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h2 className="text-2xl font-bold mt-4">Virtualized List</h2>
      <p className="text-gray-600 mt-2">
        Render large datasets efficiently without pagination.
      </p>

      <MainList data={data}/>

    </div>
  );
}

export default VirtualizedList;