import React from "react";

const Popup = ({ message, onClose }) => {
  if (!message) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Atenção</h2>
        <p className="text-gray-800 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Popup;
