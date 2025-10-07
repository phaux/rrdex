import { useParams, useSearchParams, useNavigate } from "react-router";
import { useSuspendingLiveQuery } from "./useSuspendingLiveQuery";
import { db, type Todo } from "./db";
import { useTodoList, toggleTodo, deleteTodo } from "./useTodoList";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoFilters } from "./TodoFilters";
import { FlipList } from "react-simple-flip";

export function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortBy = searchParams.get("sort") || "date";
  const filterDone = searchParams.get("filter");
  const boardIdNum = Number(boardId);

  const board = useSuspendingLiveQuery(
    () => db.boards.get(boardIdNum),
    ["boards", boardIdNum]
  );
  const todos = useTodoList(boardIdNum, sortBy, filterDone);

  const handleToggle = async (todo: Todo) => {
    await toggleTodo(todo);
  };

  const handleDelete = async (todoId: number) => {
    await deleteTodo(todoId);
  };

  const updateSort = (newSort: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", newSort);
      return newParams;
    });
  };

  const updateFilter = (newFilter: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newFilter === "all") {
        newParams.delete("filter");
      } else {
        newParams.set("filter", newFilter);
      }
      return newParams;
    });
  };

  const deleteBoard = async () => {
    await db.boards.delete(boardIdNum);
    navigate("/");
  };

  if (!board) {
    return (
      <main className="flex-1 p-8">
        <p className="text-zinc-400">Board not found</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{board.name}</h2>

        <TodoForm boardId={boardIdNum} onAdd={() => {}} />

        <TodoFilters
          sortBy={sortBy}
          filterDone={filterDone}
          onSortChange={updateSort}
          onFilterChange={updateFilter}
        />

        <div className="space-y-2">
          {todos?.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">
              No todos yet. Add one above!
            </p>
          ) : (
            <FlipList staggerDelay={33}>
              {todos?.map((todo: Todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </FlipList>
          )}
        </div>

        <button
          onClick={deleteBoard}
          className="block mt-4 ms-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-center transition-colors"
        >
          Delete board
        </button>
      </div>
    </main>
  );
}
