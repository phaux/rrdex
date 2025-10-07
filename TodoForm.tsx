import { FormEvent, useState } from "react";
import { addTodo } from "./useTodoList";

interface TodoFormProps {
  boardId: number;
  onAdd: () => void;
}

export function TodoForm({ boardId, onAdd }: TodoFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    await addTodo(boardId, newTodoTitle);
    setNewTodoTitle("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="min-w-16 flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors disabled:opacity-50"
          disabled={!newTodoTitle.trim()}
        >
          Add
        </button>
      </div>
    </form>
  );
}
