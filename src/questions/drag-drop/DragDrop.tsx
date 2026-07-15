import { Link } from "react-router-dom";

export default function DragDrop() {
  return (
    <div>
      <div className="p-8 flex justify-center items-center flex-col">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold mt-4">MultiStep Tab Form</h2>
      </div>
    </div>
  );
}
