import React from "react";

export function AddButton(
  setIsAddingReminder: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >,
  isAddingReminder: boolean | undefined,
) {
  return (
    <button
      data-testid="add-reminder"
      onClick={() => setIsAddingReminder(!isAddingReminder)}
      className="p-2 border border-transparent rounded hover:border-cool-gray-300 text-cool-gray-600"
    >
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        >
        </path>
      </svg>
    </button>
  );
}
