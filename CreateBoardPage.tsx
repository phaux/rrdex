import { SubmitEvent, useState, ViewTransition } from "react";
import { useNavigate } from "react-router";
import { db } from "./db";

export function CreateBoardPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = await db.boards.add({
      name: name.trim(),
      createdAt: Date.now(),
    });

    setName("");
    navigate(`/boards/${id}`);
  };

  return (
    <ViewTransition
      key={"boards/new"}
      enter="from-left-to-right"
      exit="from-left-to-right"
    >
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6">Create a New Board</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="boardName"
                className="block text-sm font-medium mb-2"
              >
                Board Name
              </label>
              <input
                id="boardName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Shopping, Work Tasks..."
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim()}
            >
              Create Board
            </button>
          </form>
        </div>
      </main>
    </ViewTransition>
  );
}
