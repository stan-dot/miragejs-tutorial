import { About } from "./components/About";
import { Link } from "./components/UI";
import Reminders from "./components/Reminders";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="pt-12">
      <header className="max-w-md mx-auto">
        <nav className="mt-4 space-x-5">
          <Link
            to={`/${location.search}`}
            inactiveClassName={""}
            activeClassName={""}
            title="Reminders"
          />

          <Link
            to={`/about${location.search}`}
            inactiveClassName={""}
            activeClassName={""}
            title="About"
          />
        </nav>
      </header>
      <main className="mt-10">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/:listId?" element={<Reminders />} />
        </Routes>
      </main>
    </div>
  );
}
