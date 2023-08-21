import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900" onClick={onClose}>
            <div className="bg-white p-4 rounded z-50 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-0 right-0 m-2">
                    닫기
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;