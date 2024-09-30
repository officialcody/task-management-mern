import React from "react";
import TaskModal from "../shared/modals/TaskModal";

const ViewTask = ({
  modalData,
  showViewModal,
  setShowViewModal,
  setModalData,
}) => {
  const handleOnClose = () => {
    setShowViewModal(false);
    setModalData({});
  };
  return (
    <TaskModal
      title={modalData.title}
      isOpen={showViewModal}
      onClose={handleOnClose}
      hasConfirmButton={false}
    >
      <div className="w-full">Description: {modalData.description}</div>
      <div className="w-full">Status: {modalData.status}</div>
      <div className="w-full">CreatedAt: {modalData.createdAt}</div>
    </TaskModal>
  );
};

export default ViewTask;
