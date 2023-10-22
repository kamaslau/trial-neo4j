import Koa from "koa";
import neo4j from "./libs/neo4j.js";
import { briefLog } from "./libs/utils.js";

const app = new Koa();

app.use(briefLog);

app.use(async (ctx) => {
  await neo4j.test();

  ctx.body = "Hello World!";
});

app.listen(3000);
