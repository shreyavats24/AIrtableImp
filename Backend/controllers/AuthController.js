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
      return res.json({ message: "User not found!", success: false });
    }

    console.log("Found records:", records);
       res.json({ id: records[0].id,email});

    // res.json({ message: "Successfully login !", success: true });
  } catch (err) {
    console.error("Error finding user for login:", err);
    res.json({
      success: false,
      message: "Error finding user for login!",
      error: err.message,
    });
  }
};

const signupUser = async (req, res) => {
  const {username,email,password} = req.body;
  try {
    
  } catch (error) {
    
  }
};


const specificUserTask = async (req, res) => {
  const {recordId} = req.params;
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `RECORD_ID() = '${recordId}'`,
        expand:['Task ID (from TaskId)']
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
module.exports = { loginUser, signupUser , specificUserTask };
