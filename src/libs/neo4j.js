// https://neo4j.com/docs/javascript-manual/current/
import neo4j from "neo4j-driver";

const url = "neo4j://localhost";
const dbUser = "neo4j";
const dbPwd = "12345678";

let driver;

const close = async () => {
  await driver.close();
};

const inspect = async (driver) => {
  const serverInfo = await driver.getServerInfo();

  console.log("inspect: ", serverInfo);
};

const test = async () => {
  try {
    if (!driver) driver = neo4j.driver(url, neo4j.auth.basic(dbUser, dbPwd));
    await inspect(driver);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  } finally {
    await close();
  }
};

export default { inspect, test };
