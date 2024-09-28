import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { app } from "../config/firebase";
import initialTasks from "../utils/mocks/tasks.json";

const db = getDatabase(app);

export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Recent");

  const handleAddTask = () => {
    // Implement add task functionality
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id) => {
    // Implement edit task functionality
  };

  const handleViewDetails = (id) => {
    // Implement view details functionality
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Implement other sorting options if needed
    return 0;
  });

  const renderTaskColumn = (status) => (
    <div className="flex-1 bg-white p-4 rounded-lg shadow-xl min-h-[500px]">
      <h2 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
        {status}
      </h2>
      {sortedTasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div key={task.id} className="bg-blue-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              Created at: {task.createdAt}
            </p>
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditTask(task.id)}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleViewDetails(task.id)}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Task
        </button>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Recent</option>
              {/* Add more sorting options here */}
            </select>
            <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        {renderTaskColumn("TODO")}
        {renderTaskColumn("IN PROGRESS")}
        {renderTaskColumn("DONE")}
      </div>
    </div>
  );
}
