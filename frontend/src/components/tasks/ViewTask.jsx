import React from "react";
import TaskModal from "../../portals/TaskPortal";

const ViewTask = ({ modalData, showViewModal, setShowViewModal }) => {
  return (
    <TaskModal
      title={modalData.title}
      isOpen={showViewModal}
      onClose={() => setShowViewModal(false)}
      hasConfirmButton={false}
    >
      <div className="w-full">Description: {modalData.description}</div>
      <div className="w-full">Status: {modalData.status}</div>
      <div className="w-full">CreatedAt: {modalData.createdAt}</div>
    </TaskModal>
  );
};

export default ViewTask;
