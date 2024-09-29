import React, { useState } from "react";
import TaskModal from "../../portals/TaskPortal";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";

import { TASK_STATUS } from "../../utils/app.constants";
import { createTask } from "../../apis/Tasks";

const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleTaskAdd = (event) => {
    event.preventDefault();
    const message = createTask({ title, description, status });
    message && setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Task
      </button>
      <TaskModal
        title="Add Task"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleTaskAdd}
        confirmButtonText="Save"
      >
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="py-2 px-3 mt-4 h-40 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <div className="relative mt-4 float-right">
          <select
            className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {TASK_STATUS.map((task, index) => (
              <option key={task + index} value={task}>
                {task.toUpperCase()}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </TaskModal>
    </>
  );
};

export default AddTask;
