// https://neo4j.com/docs/javascript-manual/current/
import neo4j from "neo4j-driver";
import Koa from "koa";

const url = "neo4j://localhost";
const dbUser = "neo4j";
const dbPwd = "12345678";

let driver;

const inspect = async (driver) => {
  const serverInfo = await driver.getServerInfo();

  console.log("Connection established: ", serverInfo);
};

const run = async () => {
  try {
    driver = neo4j.driver(url, neo4j.auth.basic(dbUser, dbPwd));
    await inspect(driver);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  } finally {
    await driver.close();
  }
};

const app = new Koa();

app.use(async (ctx) => {
  await run();

  ctx.body = "Hello World!";
});

app.listen(3000);
