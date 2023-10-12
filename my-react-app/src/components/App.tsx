import { Route, Routes, useLocation } from "react-router-dom";
import { About } from "./About";
import Reminders from "./Reminders";
import { Link } from "./UI";

export default function App() {
  const location = useLocation();
  const aboutIsActive = location.pathname.match("/about");
  const remindersIsActive = !aboutIsActive;

  return (
    <div className="pt-12">
      <header className="max-w-md mx-auto">
        <nav className="mt-4 space-x-5">
          <Link
            className={`pb-px font-medium text-sm ${
              remindersIsActive
                ? "text-cool-gray-900 border-b-2 border-cool-gray-600"
                : "text-cool-gray-500 hover:text-cool-gray-900"
            }`}
            to={`/${location.search}`}
          >
            Reminders
          </Link>
          <Link
            className={`pb-px font-medium text-sm ${
              aboutIsActive
                ? "text-cool-gray-900 border-b-2 border-cool-gray-600"
                : "text-cool-gray-500 hover:text-cool-gray-900"
            }`}
            to={`/about${location.search}`}
          >
            About
          </Link>
        </nav>
      </header>

      <main className="mt-10">
        <Routes>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/:listId?">
            <Reminders />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
