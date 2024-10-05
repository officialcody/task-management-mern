import ReactDOM from "react-dom";

export default function TaskModal({
  children,
  title,
  isOpen,
  onClose,
  hasConfirmButton,
  onConfirm,
  confirmButtonText,
  confirmButtonBGColor,
}) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4 gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 p-2 rounded text-white"
          >
            Cancel
          </button>
          {hasConfirmButton && (
            <button
              className={`p-2 rounded text-white ${confirmButtonBGColor}`}
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
