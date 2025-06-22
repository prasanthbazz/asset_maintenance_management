import React from 'react';
import { XMarkIcon } from './icons';

export const Modal = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 transition-opacity duration-300 ease-in-out flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className={`bg-white rounded-lg shadow-xl transform transition-all sm:w-full ${sizeClasses[size]} m-4`}>
        <div className="flex items-start justify-between p-4 border-b border-gray-200 rounded-t">
          <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end p-4 space-x-2 border-t border-gray-200 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
