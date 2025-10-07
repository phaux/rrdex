import { Todo } from "./db";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  ...props
}: TodoItemProps) {
  return (
    <div
      {...props}
      className="flex items-center gap-3 p-3 bg-zinc-800 rounded hover:bg-zinc-750 transition-colors group"
    >
      <input
        type="checkbox"
        checked={todo.done !== 0}
        onChange={() => onToggle(todo)}
        className="w-5 h-5 rounded border-zinc-600 bg-zinc-700 cursor-pointer"
      />
      <span
        className={`flex-1 ${todo.done ? "line-through text-zinc-500" : ""}`}
      >
        {todo.title}
      </span>
      <span className="text-xs text-zinc-500">
        {new Date(todo.createdAt).toLocaleDateString()}
      </span>
      <button
        onClick={() => onDelete(todo.id!)}
        className="p-2 -m-2 text-sm text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
