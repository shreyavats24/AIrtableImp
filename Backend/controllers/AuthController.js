const axios = require("axios");
const Airtable = require("airtable");
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.API_key; // Your generated token
const TABLE_NAME = process.env.AuthTable;

const base = new Airtable({ apiKey: process.env.API_key }).base(
  process.env.AIRTABLE_BASE_ID
);

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received:", req.body);

  if (!email || !password) {
    return res.json({ message: "Send valid field data!", success: false });
  }

  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `AND({Email} = '${email}', {Password} = '${password}')`,
        // fields: ["username", "Email"],
      })
      .all();
    if (records.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    console.log("Found records:", records);
    res.status(200).json({ id: records[0].id, email });

    // res.json({ message: "Successfully login !", success: true });
  } catch (err) {
    console.error("Error finding user for login:", err);
    res.status(500).json({
      success: false,
      message: "Error finding user for login!",
      error: err.message,
    });
  }
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
  } catch (error) {}
};

const specificUserTask = async (req, res) => {
  const { recordId } = req.params;
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `RECORD_ID() = '${recordId}'`,
        expand: ["Task ID (from TaskId)"],
      })
      .all();
    // console.log('rec: ',records);
    // res.json({message:"Data fetched!",data:})
  } catch (error) {
    console.error("Error finding data for login user : ", error);
    res.json({
      success: false,
      message: "Error finding data for login user!",
      error: error.message,
    });
  }
};

// if you want more pagination
// by default eachPage gives 100 records per fetchRequest
const getSpecificNoOfTasks = async (req, res) => {
  const { pageCount } = req.body;
  try {
    base(TABLE_NAME)
      .select({
        pageSize: pageCount,
      })
      .eachPage(
        (records, fetchNextPage) => {
          console.log(...records);
          fetchNextPage();
        },
        (err) => {
          if (err) console.error(err);
        }
      );
  } catch (error) {}
};

// get first recrds from the db

const getFirstPage = async (req, res) => {
  base(TABLE_NAME)
    .select({ pageSize: 10 })
    .firstPage((err, records) => {
      if (err) console.log(err);
      else console.log(...records);
    });
};

module.exports = { loginUser, signupUser, specificUserTask };
