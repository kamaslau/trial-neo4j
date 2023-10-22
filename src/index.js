import Koa from "koa";
import neo4j from "./libs/neo4j.js";
import { briefLog } from "./libs/utils.js";

const app = new Koa();

app.use(briefLog);

app.use(async (ctx) => {
  // await neo4j.test();

  const collectionName = "Person";

  await neo4j.insertOne(collectionName);

  // const result = await neo4j.count(collectionName);

  const result = await neo4j.findMany(collectionName);

  ctx.body = result;
});

app.listen(3000);
