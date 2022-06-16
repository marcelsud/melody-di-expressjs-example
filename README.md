# Melody DI - ExpressJS example (Node.js)

How easy is it to use the [Melody DI library](https://www.npmjs.com/package/@marcelsud/melody-di) with ExpressJS?

Spoiler: It is very easy... 😉

## 🚀 Melody DI in action

Take a look at the `src/bootstrap.mjs` file where we setup the Melody DI container:

```javascript
export function bootstrap() {
  container.set("keyv", () => {
    const keyv = new Keyv("sqlite://data/db.sqlite");
    keyv.on("error", (error) => {
      console.error(error);
    });

    return keyv;
  });

  container.set("todo_repository", () => {
    return new TodoRepository(container.get("keyv"));
  });

  container.set("logger", () => logger);
}
```

And then later used somewhere else:

```javascript
const logger = container.get("logger");
const todoRepository = container.get("todo_repository");
```

## 🔥 Let's run it!

### Using Docker

If you know your way with Docker, just build the image and run it!

```bash
  docker build . -t melody-di-express
  docker run -p 3000:3000 --rm melody-di-express
```

When it is done setting everything up the server will display it is up and ready to receive requests:

```
  info: Example app listening on port 3000 {"service":"melody-di-todos"}
```

### Running it locally

I suggest running it with Node.js v16 (Active LTS version)

Clone the project

```bash
  git clone https://github.com/marcelsud/melody-di-expressjs-example
```

Go to the project directory

```bash
  cd melody-di-expressjs-example
```

Install dependencies

```bash
  npm run setup
```

Start the server

```bash
  npm run start
```

When it is done setting everything up the server will display it is up and ready to receive requests:

```
  info: Example app listening on port 3000 {"service":"melody-di-todos"}
```

## 📝 Feedback

👋 If you have any feedback, please reach out to me at [@marcelsud](https://twitter.com/marcelsud)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelsud/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/marcelsud)
