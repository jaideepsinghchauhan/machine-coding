import { Link } from "react-router-dom";
import Main from "./Main";

export interface BoardData {
  todo: string[];
  inProgress: string[];
  completed: string[];
}

export interface DragDropProps {
  data: BoardData;
}

export default function DragDrop() {
  const initialData: DragDropProps = {
    data: {
      todo: [
        "Design the UI",
        "Implement the backend",
        "Write unit tests",
        "integrate the payment API",
      ],
      inProgress: [
        "develop the login feature",
        "create the database schema",
      ],
      completed: [
        "Set up the project structure",
        "Implement the authentication module",
        "Create the landing page",
      ],
    },
  };

  return (
    <div>
      <div className="p-8 flex justify-center items-center flex-col">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold mt-4">Drag and Drop</h2>
        <Main data={initialData.data} />
      </div>
    </div>
  );
}
