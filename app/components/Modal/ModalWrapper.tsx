"use client";

import { useState } from "react";
import Modal from "./Modal";

const ModalWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Modal megnyitása
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="bg-red-400 dark:bg-gray-800 p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modal cím</h2>
            <p className="mb-4">Ez egy modal tartalom</p>

            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Bezárás
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;
