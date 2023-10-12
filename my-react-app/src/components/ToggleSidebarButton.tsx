import React from "react";

export function ToggleSidebarButton(
  setSidebarIsOpen,
  sidebarIsOpen: boolean | null | undefined,
) {
  return (
    <div className="flex items-center w-12 group">
      <button
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        className="hidden w-2 h-10 ml-2 rounded-full bg-cool-gray-200 hover:bg-cool-gray-300 group-hover:block"
        data-testid="toggle-sidebar"
      >
      </button>
    </div>
  );
}
