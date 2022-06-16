import { Container } from '@marcelsud/melody-di';
import Keyv from 'keyv';

import logger from './logger.mjs';
import TodoRepository from './todo-repository.mjs';

export const container = new Container();

export function bootstrap() {
  container.set("keyv", () => {
    return new Keyv("sqlite://data/db.sqlite");
  });

  container.set("todo_repository", () => {
    return new TodoRepository(container.get("keyv"));
  });

  container.set("logger", () => logger);
}
