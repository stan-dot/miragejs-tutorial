import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reminder } from "./Reminders";

export function AnimatedReminders(
  reminders: Reminder[],
  hasRenderedRemindersRef: React.MutableRefObject<boolean>,
  listId: string | undefined,
  deleteReminder: (id: any) => void,
): React.ReactNode {
  return (
    <div>
      <ul className="divide-y divide-cool-gray-100">
        <AnimatePresence>
          {reminders.map((reminder, i) => (
            <motion.li
              variants={{
                hidden: (i) => ({
                  opacity: 0,
                  y: -50 * i,
                }),
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.025,
                  },
                }),
                removed: {
                  opacity: 0,
                },
              }}
              initial={hasRenderedRemindersRef.current ? "visible" : "hidden"}
              animate="visible"
              exit="removed"
              custom={i}
              className="flex items-center justify-between py-2 group"
              key={reminder.id}
              data-testid="reminder"
            >
              <div>
                {reminder.text}
                {!listId && reminder.list && (
                  <span
                    className="px-2 py-1 ml-3 text-xs font-medium rounded bg-cool-gray-100 text-cool-gray-600"
                    data-testid="list-tag"
                  >
                    {reminder.list.name}
                  </span>
                )}
              </div>
              <button
                className="flex items-center invisible px-2 py-1 opacity-50 hover:opacity-100 group-hover:visible"
                onClick={() => deleteReminder(reminder.id)}
                data-testid="delete-reminder"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  >
                  </path>
                </svg>
                ️
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
