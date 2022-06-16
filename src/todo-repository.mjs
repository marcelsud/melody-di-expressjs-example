import Todo from './todo.mjs';

class TodoRepository {
  constructor(keyv) {
    this.keyv = keyv;
  }

  async saveTodo(todo) {
    this.keyv.set(todo.id, {
      title: todo.getTitle(),
      description: todo.getDescription(),
      id: todo.getId(),
      done: todo.getDone(),
    });
  }

  async hasTodo(id) {
    return this.keyv.has(id);
  }

  async getTodo(id) {
    return Todo.create(await this.keyv.get(id));
  }

  async deleteTodo(id) {
    this.keyv.delete(id);
  }

  async markTodoAsDone(id) {
    const todo = await getTodo(id);
    todo.done = true;
    saveTodo(todo);
  }

  async listTodos() {
    let entries = [];
    for await (const [_, value] of this.keyv.iterator()) {
      entries.push(Todo.create(value));
    }

    return entries;
  }
}

export default TodoRepository;
