type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className=" dark:bg-gray-800  rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
