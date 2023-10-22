// https://neo4j.com/docs/javascript-manual/current/
import * as neo4j from "neo4j-driver";

const url = "neo4j://localhost";
const dbUser = "neo4j";
const dbPwd = "12345678";

(async () => {
  let driver;

  try {
    driver = neo4j.driver(url, neo4j.auth.basic(dbUser, dbPwd));
    const serverInfo = await driver.getServerInfo();
    console.log("Connection established");
    console.log(serverInfo);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
})();
