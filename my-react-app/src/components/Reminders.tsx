import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BooleanParam, useQueryParam } from "use-query-params";
import { AddButton } from "./AddButton";
import { AddingForm } from "./AddingForm";
import { AnimatedReminders } from "./AnimatedReminders";
import { ErrorDisplay } from "./ErrorDisplay";
import { SideBar } from "./SideBar";
import { ToggleSidebarButton } from "./ToggleSidebarButton";

export type Reminder = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  name: string;
};

export default function Reminders() {
  const location = useLocation();
  const { listId } = useParams();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [lists, setLists] = useState<List[]>();
  const [error, setError] = useState<string>("");
  const [isAddingReminder, setIsAddingReminder] = useState<boolean>();
  const [isSavingReminder, setIsSavingReminder] = useState<boolean>();
  const [isAddingList, setIsAddingList] = useState<boolean>();
  const [isSavingList, setIsSavingList] = useState<boolean>();
  const [newReminderText, setNewReminderText] = useState<string>("");
  const [newListName, setNewListName] = useState<string>("");
  const [sidebarIsOpen, setSidebarIsOpen] = useQueryParam("open", BooleanParam);

  const activeList = listId && lists?.find((list) => list.id === listId);

  useEffect(() => {
    let isCurrent = true;
    setReminders(null);
    const url = listId ? `/api/lists/${listId}/reminders` : `/api/reminders`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (isCurrent) {
          setReminders(json.reminders);
        }
      })
      .catch((e) => {
        if (isCurrent) {
          setError("We couldn't load your reminders. Try again soon.");
          console.error(e);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [listId]);

  useEffect(() => {
    let isCurrent = true;

    if (sidebarIsOpen) {
      fetch(`/api/lists`)
        .then((res) => res.json())
        .then((json) => {
          if (isCurrent) {
            setLists(json.lists);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }

    return () => {
      isCurrent = false;
    };
  }, [sidebarIsOpen]);

  function createReminder(e) {
    e.preventDefault();

    if (!newReminderText) {
      return;
    }

    setIsSavingReminder(true);

    fetch("/api/reminders", {
      method: "POST",
      body: JSON.stringify({
        text: newReminderText,
        ...(listId && { listId }),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNewReminderText("");
        setReminders((reminders) => [...reminders, json.reminder]);
        setIsAddingReminder(false);
      })
      .catch((e) => {
        setError("Your Reminder wasn't saved. Try again.");
        console.error(e);
      })
      .finally(() => {
        setIsSavingReminder(false);
      });
  }

  function createList(e) {
    e.preventDefault();

    if (!newListName) {
      return;
    }

    setIsSavingList(true);

    fetch("/api/lists", {
      method: "POST",
      body: JSON.stringify({
        name: newListName,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNewListName("");
        setLists((lists) => {
          return [...lists, json.list];
        });
        setIsAddingList(false);
      })
      .catch(() => {
        return setError("Your List wasn't saved. Try again.");
      })
      .finally(() => {
        setIsSavingList(false);
      });
  }

  function deleteReminder(id) {
    fetch(`/api/reminders/${id}`, { method: "DELETE" });
    setReminders((reminders) =>
      reminders.filter((reminder) => reminder.id !== id)
    );
  }

  function deleteList() {
    fetch(`/api/lists/${listId}`, { method: "DELETE" });
    setLists((lists) => lists?.filter((list) => list.id !== listId));
  }

  const hasRenderedRemindersRef = useRef(false);
  useEffect(() => {
    if (reminders) {
      hasRenderedRemindersRef.current = true;
    } else {
      hasRenderedRemindersRef.current = false;
    }
  }, [reminders]);

  return (
    <div className="flex justify-center">
      <div className="flex mx-auto overflow-hidden rounded-md shadow-lg">
        <AnimatePresence initial={false}>
          {sidebarIsOpen && (
            SideBar(
              location,
              lists,
              isAddingList,
              createList,
              isSavingList,
              newListName,
              setNewListName,
              setIsAddingList,
            )
          )}
        </AnimatePresence>

        <div className="flex flex-1 bg-white w-md">
          {ToggleSidebarButton(setSidebarIsOpen, sidebarIsOpen)}

          <div className="flex-1 pt-12 pb-12 pr-12">
            <div className="flex items-center justify-between mb-10">
              <h1
                className="flex items-center justify-between text-3xl font-bold leading-none"
                data-testid="active-list-title"
              >
                {activeList?.name || "Reminders"}
              </h1>

              {AddButton(setIsAddingReminder, isAddingReminder)}
            </div>

            <div>
              {error && (
                ErrorDisplay(error)
              )}

              {reminders?.length > 0
                ? (
                  AnimatedReminders(
                    reminders,
                    hasRenderedRemindersRef,
                    listId,
                    deleteReminder,
                  )
                )
                : reminders
                ? (
                  <p className="pt-3 pb-3 font-medium text-cool-gray-400">
                    All done!
                  </p>
                )
                : !error
                ? (
                  <p className="pt-3 pb-3 font-medium text-cool-gray-400">
                    Loading...
                  </p>
                )
                : null}

              {isAddingReminder && (
                AddingForm(
                  createReminder,
                  isSavingReminder,
                  newReminderText,
                  setNewReminderText,
                )
              )}
            </div>

            {listId && (
              <div className="mt-20 text-right">
                <button
                  onClick={deleteList}
                  className="px-2 text-sm font-medium text-cool-gray-400 hover:text-cool-gray-600"
                  data-testid="delete-list"
                >
                  Delete list
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
