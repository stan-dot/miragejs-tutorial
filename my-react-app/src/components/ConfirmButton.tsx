import React from "react";

export function ConfirmButton(
  setIsAddingList: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  isAddingList: boolean | undefined,
) {
  return (
    <div className="mt-10">
      <button
        onClick={() => setIsAddingList(!isAddingList)}
        className="flex items-center mx-6 text-xs text-cool-gray-400 hover:text-white"
        data-testid="add-list"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
            fillRule="evenodd"
          >
          </path>
        </svg>
        Add list
      </button>
    </div>
  );
}
