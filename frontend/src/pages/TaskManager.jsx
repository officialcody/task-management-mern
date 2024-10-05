import React, { useContext, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/tasks/AddTask";
import { getAllTasks } from "../apis/Tasks";
import TaskColumn from "../components/TaskColumn";
import { AuthContext } from "../context/AuthContext";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Recent");

  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    const response = await getAllTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [tasks]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center mb-4 gap-4">
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
            </select>
            <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <AddTask />
      </div>
      <div className="flex space-x-4">
        <TaskColumn status={"todo"} tasks={tasks} />
        <TaskColumn status={"in-progress"} tasks={tasks} />
        <TaskColumn status={"done"} tasks={tasks} />
      </div>
    </div>
  );
}
