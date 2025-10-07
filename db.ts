import { Dexie, type EntityTable } from "dexie";

export interface Board {
  id?: number;
  name: string;
  createdAt: number;
}

export interface Todo {
  id?: number;
  boardId: number;
  title: string;
  done: 1 | 0;
  createdAt: number;
}

class TodoDatabase extends Dexie {
  boards!: EntityTable<Board, "id">;
  todos!: EntityTable<Todo, "id">;

  constructor() {
    super("TodoDatabase");

    // Schema with compound indexes
    this.version(1).stores({
      boards: "++id, name, createdAt",
      todos: `
        ++id,
        boardId,
        [boardId+done+title],
        [boardId+done+createdAt],
        [boardId+title],
        [boardId+createdAt]
      `,
    });
  }
}

const db = new TodoDatabase();

export { db };
