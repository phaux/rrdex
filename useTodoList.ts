import { useDeferredValue } from "react";
import { db, type Todo } from "./db";
import { useSuspendingLiveQuery } from "./useSuspendingLiveQuery";

export function useTodoList(
  boardId: number,
  sortBy: string,
  filterDone: string | null,
) {
  const todos = useSuspendingLiveQuery(() => {
    if (!boardId) return [];

    let query;

    if (filterDone === "done") {
      if (sortBy === "title") {
        query = db.todos
          .where("[boardId+done+title]")
          .between([boardId, 1, ""], [boardId, 1, "\uffff"]);
      } else {
        query = db.todos
          .where("[boardId+done+createdAt]")
          .between([boardId, 1, 0], [boardId, 1, Infinity])
          .reverse();
      }
    } else if (filterDone === "active") {
      if (sortBy === "title") {
        query = db.todos
          .where("[boardId+done+title]")
          .between([boardId, 0, ""], [boardId, 0, "\uffff"]);
      } else {
        query = db.todos
          .where("[boardId+done+createdAt]")
          .between([boardId, 0, 0], [boardId, 0, Infinity])
          .reverse();
      }
    } else {
      if (sortBy === "title") {
        query = db.todos
          .where("[boardId+title]")
          .between([boardId, ""], [boardId, "\uffff"]);
      } else {
        query = db.todos
          .where("[boardId+createdAt]")
          .between([boardId, 0], [boardId, Infinity])
          .reverse();
      }
    }

    return query.toArray();
  }, ["todos", boardId, sortBy, filterDone]);

  return useDeferredValue(todos);
}

export async function addTodo(boardId: number, title: string) {
  if (!title.trim()) return;

  await db.todos.add({
    boardId,
    title: title.trim(),
    done: 0,
    createdAt: Date.now(),
  });
}

export async function toggleTodo(todo: Todo) {
  await db.todos.update(todo.id!, { done: todo.done ? 0 : 1 });
}

export async function deleteTodo(todoId: number) {
  await db.todos.delete(todoId);
}
