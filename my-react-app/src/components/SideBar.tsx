import React from "react";
import { Link } from "./UI";
import { motion } from "framer-motion";
import { ConfirmButton } from "./ConfirmButton";
import { List } from "./Reminders";
import { Location } from "react-router-dom";

export function SideBar(
  location: Location,
  lists: List[] | undefined,
  isAddingList: boolean | undefined,
  createList: (e: any) => void,
  isSavingList: boolean | undefined,
  newListName: string,
  setNewListName: React.Dispatch<React.SetStateAction<string>>,
  setIsAddingList: React.Dispatch<React.SetStateAction<boolean | undefined>>,
): React.ReactNode {
  return (
    <motion.div
      animate={{ width: 192 }}
      initial={{ width: 0 }}
      exit={{ width: 0 }}
      className="flex flex-col bg-cool-gray-800"
    >
      <div className="flex flex-col flex-1 w-48 pt-12 pb-4 bg-cool-gray-800">
        <div className="flex-1">
          <div>
            <Link
              activeClassName="bg-cool-gray-700 text-white"
              inactiveClassName="text-cool-gray-400 hover:text-white"
              to={`/${location.search}`}
              title="All"
            />

            {lists?.map((list) => (
              <Link
                key={list.id}
                activeClassName="bg-cool-gray-700 text-white"
                inactiveClassName="text-cool-gray-400 hover:text-white"
                to={`/${list.id}${location.search}`}
                title={list.name}
              />
            ))}
          </div>

          {isAddingList && (
            <form
              onSubmit={createList}
              className={`${
                isSavingList ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="relative">
                <input
                  autoFocus
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="block w-full py-2 pl-6 text-sm font-medium text-white border-transparent rounded-none pr-9 focus:shadow-none form-input bg-cool-gray-700"
                  type="text"
                  placeholder="New list..."
                  data-testid="new-list-text"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-cool-gray-400 hover:text-cool-gray-200"
                  data-testid="save-new-list"
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
            </form>
          )}
        </div>
        {ConfirmButton(setIsAddingList, isAddingList)}
      </div>
    </motion.div>
  );
}
