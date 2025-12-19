type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <div
      className="fixed inset-0 z-50 h-screen flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="m-3 dark:bg-gray-800  rounded shadow-lg mb-30"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
