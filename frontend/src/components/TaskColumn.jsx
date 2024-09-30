import { useState } from "react";
import { viewTask } from "../apis/Tasks";
import ViewTask from "./tasks/ViewTask";

const TaskColumn = ({ tasks, status }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleViewDetails = async (id) => {
    const response = await viewTask(id);
    setModalData({ ...response.data });
    setShowViewModal(true);
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-lg shadow-xl min-h-[500px]">
      <h2 className="text-lg font-semibold mb-4 bg-blue-500 text-white p-2 rounded">
        {status.toUpperCase()}
      </h2>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div key={task._id} className="bg-blue-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              Created at: {task.createdAt}
            </p>
            <div className="flex justify-end mt-2 space-x-2">
              <button
                // onClick={() => handleDeleteTask(task._id)}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                // onClick={() => handleEditTask(task._id)}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleViewDetails(task._id)}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      <ViewTask
        modalData={modalData}
        setShowViewModal={setShowViewModal}
        showViewModal={showViewModal}
      />
    </div>
  );
};

export default TaskColumn;
