import React from "react";

export function AddingForm(
  createReminder: (e: any) => void,
  isSavingReminder: boolean | undefined,
  newReminderText: string,
  setNewReminderText: React.Dispatch<React.SetStateAction<string>>,
): React.ReactNode {
  return (
    <form
      onSubmit={createReminder}
      className={`-mx-3 ${
        isSavingReminder ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div>
        <div className="relative py-1">
          <input
            id="email"
            autoFocus
            className="block w-full py-2 transition duration-150 ease-in-out border-2 border-transparent focus form-input focus:shadow-none focus:border-blue-300 sm:leading-5"
            placeholder="New reminder..."
            data-testid="new-reminder-text"
            value={newReminderText}
            onChange={(e) => setNewReminderText(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex py-1">
            <button
              type="submit"
              data-testid="save-new-reminder"
              className="items-center px-4 text-sm text-cool-gray-700 hover:text-cool-gray-400"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                >
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
