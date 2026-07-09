import { Link } from "react-router-dom";

function VirtualizedList() {
  return (
    <div className="p-8">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h2 className="text-2xl font-bold mt-4">Virtualized List</h2>
      <p className="text-gray-600 mt-2">
        Render large datasets efficiently without pagination.
      </p>

      {/* TODO: Implement virtualization logic */}
    </div>
  );
}

export default VirtualizedList;