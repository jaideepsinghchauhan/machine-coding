import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VirtualizedList from "./questions/virtualized-list/VirtualizedList";

interface Question {
  path: string;
  name: string;
  component: React.ReactElement;
}

const questions: Question[] = [
  {
    path: "/virtualized-list",
    name: "Virtualized List",
    component: <VirtualizedList />,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-2">⚛️ React Machine Coding Prep</h1>
      <p className="text-gray-600 mb-6">Select a question to practice:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => (
          <Link
            key={q.path}
            to={q.path}
            className="block bg-white shadow rounded-lg p-5 hover:shadow-md hover:-translate-y-0.5 transition-all border border-gray-200"
          >
            <span className="text-lg font-medium text-gray-800">
              {q.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/machine-coding">
      <Routes>
        <Route path="/" element={<Home />} />
        {questions.map((q) => (
          <Route key={q.path} path={q.path} element={q.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;