import { useSuspendingLiveQuery } from "dexie-react-hooks";
import { useDeferredValue, useState, ViewTransition } from "react";
import { Link, NavLink } from "react-router";
import { db, type Board } from "./db";

export function AppSidebar() {
  const [sortBy, setSortBy] = useState("createdAt");

  const boards = useDeferredValue(
    useSuspendingLiveQuery(
      () =>
        sortBy === "name"
          ? db.boards.orderBy("name").toArray()
          : db.boards.orderBy("createdAt").reverse().toArray(),
      ["boards", sortBy],
    ),
  );

  return (
    <aside className="w-3xs bg-zinc-800 border-r border-zinc-700 p-4 flex flex-col h-full resize-x overflow-hidden">
      <h1 className="text-xl font-bold mb-6">Boards</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSortBy("createdAt")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            sortBy === "createdAt"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => setSortBy("name")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            sortBy === "name"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          by Name
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {boards?.map((board: Board) => (
            <ViewTransition key={board.id}>
              <li>
                <NavLink
                  to={`/boards/${board.id}`}
                  className="block px-3 py-2 rounded hover:bg-zinc-700 transition-colors current-page:bg-zinc-700"
                >
                  {board.name}
                </NavLink>
              </li>
            </ViewTransition>
          ))}
        </ul>
      </nav>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors"
      >
        + New Board
      </Link>
    </aside>
  );
}
