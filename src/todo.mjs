import { randomUUID } from 'crypto';

class Todo {
  constructor(props) {
    this.id = props.id || randomUUID();
    this.title = props.title;
    this.description = props.description;
    this.done = typeof props.done === "boolean" ? props.done : false;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDone() {
    return this.done;
  }

  markAsDone(done) {
    this.done = done;
  }

  static create(props) {
    return new Todo(props);
  }
}

export default Todo;
