import Koa from "koa";

const app = new Koa();

// TODO Import and demo Neo4j official Node.js driver

app.use(async (ctx) => {
  ctx.body = "Hello World!";
});

app.listen(3000);
