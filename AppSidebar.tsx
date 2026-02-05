import { useSuspendingLiveQuery } from "dexie-react-hooks";
import { useDeferredValue, ViewTransition } from "react";
import { Link, NavLink } from "react-router";
import { db, type Board } from "./db";

export function AppSidebar() {
  const boards = useDeferredValue(
    useSuspendingLiveQuery(
      () => db.boards.orderBy("createdAt").reverse().toArray(),
      ["boards"],
    ),
  );

  return (
    <aside className="w-3xs bg-zinc-800 border-r border-zinc-700 p-4 flex flex-col h-full resize-x overflow-hidden">
      <h1 className="text-xl font-bold mb-6">Boards</h1>
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
