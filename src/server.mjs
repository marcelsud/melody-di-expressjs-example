import bodyParser from 'body-parser';
import express from 'express';

import { bootstrap, container } from './bootstrap.mjs';
import Todo from './todo.mjs';

bootstrap();
const logger = container.get("logger");
const todoRepository = container.get("todo_repository");

const port = 3000;
const app = express();
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send({
    data: {
      message:
        "This is an example using @marcelsud/melody-di in an expressjs app.",
    },
  });
});

app.get("/todos", async (_, res) => {
  const todos = await todoRepository.listTodos();
  logger.debug(`Listing ${todos.length} todos`);

  res.status(200).send({
    data: todos,
  });
});

app.get("/todos/:id", async (req, res) => {
  const hasTodo = await todoRepository.hasTodo(req.params.id);
  if (!hasTodo) {
    res.status(404).send({
      error: {
        message: "Todo not found",
      },
    });
    return;
  }

  logger.debug(`Getting todo with id: ${req.params.id}`);
  const todo = await todoRepository.getTodo(req.params.id);
  res.status(200).send({
    data: todo,
  });
});

app.post("/todos", async (req, res) => {
  logger.debug(`Creating todo with title: ${req.body.title}`);
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  await todoRepository.saveTodo(todo);
  res.status(201).send({
    data: todo,
  });
});

app.patch("/todos/:id", async (req, res) => {
  const hasTodo = await todoRepository.hasTodo(req.params.id);
  if (!hasTodo) {
    res.status(404).send({
      error: {
        message: "Todo not found",
      },
    });
    return;
  }

  logger.debug(`Updating todo with id: ${req.params.id}`);
  const todo = await todoRepository.getTodo(req.params.id);

  if (req.body?.title !== undefined) {
    todo.title = req.body.title;
  }

  if (req.body?.description !== undefined) {
    todo.description = req.body.description;
  }

  if (typeof req.body.done === "boolean") {
    todo.markAsDone(req.body.done);
  }

  await todoRepository.saveTodo(todo);

  res.status(200).send({
    data: todo,
  });
});

app.put("/todos/:id", async (req, res) => {
  const hasTodo = await todoRepository.hasTodo(req.params.id);
  if (!hasTodo) {
    res.status(404).send({
      error: {
        message: "Todo not found",
      },
    });
    return;
  }

  logger.debug(`Updating todo with id: ${req.params.id}`);
  const todo = await todoRepository.getTodo(req.params.id);
  todo.setTitle(req.body.title);
  todo.setDescription(req.body.description);
  todo.markAsDone(req.body.done);
  await todoRepository.saveTodo(todo);
  res.status(200).send({
    data: todo,
  });
});

app.delete("/todos/:id", async (req, res) => {
  const hasTodo = await todoRepository.hasTodo(req.params.id);
  if (!hasTodo) {
    res.status(404).send({
      error: {
        message: "Todo not found",
      },
    });
    return;
  }

  logger.debug(`Deleting todo with id: ${req.params.id}`);
  await todoRepository.deleteTodo(req.params.id);
  res.status(204).send();
});

app.use(function (err, _, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(err);
  res.status(500).send({
    error: {
      message: "Something broke!",
    },
  });
});

const server = app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});

process.on("SIGINT", shutdown);

function shutdown() {
  console.log("gracefully shutting down");
  server.close(function () {
    console.log(
      "\n\nDon't forget to check Melody DI out at https://www.npmjs.com/package/@marcelsud/melody-di"
    );
    console.log("Bye! 👋");
  });
}
