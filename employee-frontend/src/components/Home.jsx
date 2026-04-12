import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      
      {/* Title */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Employee Management System
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-10 max-w-xl">
        Easily manage employee records, add new employees, update details, and
        keep everything organized in one place.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/create-emp")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Add Employee
        </button>

        <button
          onClick={() => navigate("/list")}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl shadow-md hover:bg-gray-900 transition"
        >
          View Employees
        </button>
      </div>

      {/* Small footer line */}
      <p className="mt-16 text-sm text-gray-500">
        Simple * Fast * Reliable
      </p>
    </div>
  );
}

export default Home;