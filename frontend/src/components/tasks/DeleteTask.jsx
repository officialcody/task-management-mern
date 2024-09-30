import React from "react";
import { toast } from "react-toastify";
import TaskModal from "../shared/modals/TaskModal";
import { deleteTask } from "../../apis/Tasks";

const DeleteTask = ({
  showDeleteModal,
  setShowDeleteModal,
  modalData,
  setModalData,
}) => {
  const handleDelete = async () => {
    try {
      const response = await deleteTask(modalData._id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setModalData({});
      setShowDeleteModal(false);
    }
  };
  return (
    <TaskModal
      title={""}
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      hasConfirmButton={true}
      confirmButtonText={"Delete"}
      onConfirm={handleDelete}
      confirmButtonBGColor="bg-red-500"
    >
      <div>Are you sure you want to delete this task?</div>
    </TaskModal>
  );
};

export default DeleteTask;
