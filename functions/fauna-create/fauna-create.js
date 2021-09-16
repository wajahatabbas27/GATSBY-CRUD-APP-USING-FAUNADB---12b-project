const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config;

const handler = async (event) => {
  try {
    //only allow POST data
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method not Allowed" };
    }

    let reqObj = JSON.parse(event.body);

    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

    const result = await client.query(
      q.Create(q.Collection("main-directory"), {
        data: { title: reqObj.title },
      })
    );

    console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
