import React from "react";
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function Modal({ title, children, onClose, onSubmit }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg relative">
           <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition duration-150 ease-in-out" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
         <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
           <form onSubmit={onSubmit}>
            {children}
            <div className="mt-4 flex justify-end space-x-2">
             <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition duration-150 ease-in-out">Create</button>
             </div>
           </form>
       </div>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ label, value, onChange }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
         className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-primary dark:focus:border-primary"
      />
    </div>
  );
}