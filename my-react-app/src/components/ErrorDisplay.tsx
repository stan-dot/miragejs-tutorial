import React from "react";

export function ErrorDisplay(error: string): React.ReactNode {
  return (
    <div className="fixed bottom-0 right-0 mb-8 mr-8 bg-white border-b-4 border-red-500 rounded-md shadow-xl">
      <div className="flex p-4 pr-5 rounded-md">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 mr-1 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="font-medium leading-5 text-red-600 text">
            Network error
          </h3>
          <div className="mt-2 text-sm leading-5">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
