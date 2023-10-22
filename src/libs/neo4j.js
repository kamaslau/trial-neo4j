// https://neo4j.com/docs/javascript-manual/current/
import neo4j from "neo4j-driver";

const dbUrl = process.env.DB_URL ?? "neo4j://localhost";
const dbName = process.env.DB_NAME ?? "neo4j";
const dbUser = process.env.DB_USER ?? "neo4j";
const dbPwd = process.env.DB_PWD ?? "12345678";

let client = null;

const initDB = async () => {
  // use existing connection, if any
  if (!!client) {
    return client;
  }

  try {
    client = neo4j.driver(dbUrl, neo4j.auth.basic(dbUser, dbPwd));

    return client;
  } catch (error) {
    console.log("error: ", error);
  }
};

const close = async (client) => {
  await client.close();
};

const inspect = async (driver) => {
  const serverInfo = await driver.getServerInfo();

  console.log("inspect: ", serverInfo);
};

const test = async () => {
  try {
    const client = await initDB();

    await inspect(client);

    await close(client);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
};

const count = async (collectionName, data) => {
  console.log("count: ", collectionName, data);

  const client = await initDB();

  let result = null;
  try {
    result = await client.executeQuery(
      `MATCH (p: ${collectionName}) RETURN count(p) AS count`,
      {},
      { database: dbName }
    );
  } catch (error) {
    console.error("error: ", error);
  }

  // console.log("result: ", result);
  return Number(result.records.at(0).get("count"));
};

const findMany = async (collectionName, query = {}, options = {}) => {
  console.log("findMany: ", collectionName, query, options);

  const client = await initDB();

  const response = {
    count: 0,
    data: [],
  };

  let result = null;
  try {
    result = await client.executeQuery(
      `MATCH (p: ${collectionName})
      WITH count(p) AS count
      MATCH (p: ${collectionName})
      WITH p, count
      ${options.limit ? `LIMIT ${options.limit}` : ""}
      RETURN p AS node, count`,
      {},
      { database: dbName }
    );
  } catch (error) {
    console.error("error: ", error);
  }

  // const { records, summary } = result;
  // for (let record of records) {
  //   console.log(`Person: ${record.get("node").properties.name}`);
  //   console.log(`Available properties for this node are: ${record.keys}\n`);
  // }
  // console.log(
  //   `The query \`${summary.query.text}\` ` +
  //     `returned ${records.length} nodes.\n`
  // );

  // console.log("result: ", result);

  response.count = Number(result.records.at(0).get("count"));
  response.data = result.records.map((item) => item.get("node"));
  return response;
};

const insertOne = async (collectionName, data) => {
  console.log("insertOne: ", collectionName, data);

  const client = await initDB();

  let result = null;
  try {
    result = await client.executeQuery(
      `MERGE (p: ${collectionName} {name: $name})`,
      { name: "Kamas" },
      { database: dbName }
    );
  } catch (error) {
    console.error("error: ", error);
  }

  // const { records, summary } = result;
  // console.log(
  //   `Created ${summary.counters.updates().nodesCreated} nodes ` +
  //     `in ${summary.resultAvailableAfter} ms.`
  // );

  // console.log("result: ", result);
  return result;
};

export default { inspect, test, count, insertOne, findMany };
