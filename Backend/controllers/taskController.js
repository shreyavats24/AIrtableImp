const Airtable = require("airtable");
require("dotenv").config();

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.API_key; // Your generated token
const TABLE_NAME = process.env.TableName;

const base = new Airtable({ apiKey: process.env.API_key }).base(
  process.env.AIRTABLE_BASE_ID
);


const getTasks = async (req,res)=>{
  try {
    const records = await base(TABLE_NAME).select().all();
    
  } catch (error) {
    res.json({message:"Error Fetching data",success:false});
  }
}
addNewTask = async (req,res)=>{
  // const {taskName ,AssignedTo,DueDate,priority,status }=req.body;
  const {fields} = req.body;
  const results = await base(TABLE_NAME).create([
    // {
    //   fields:{
    //     "Task Name":taskName,
    //     "Assigned To":AssignedTo,
    //     "Due Date":DueDate,
    //     "Priority": priority,
    //     "status":status,
    //   }
    // }
    {fields}
  ])
  res.json({success:true,data:results[0]});
}

const deleteTask = async(req,res)=>{
  const {recordId} = req.body;
  if(!recordId){
    return res.json({message:"Send Valid Id!!",success:false});
  }
  try {
    await base(TABLE_NAME).destroy(recordId); // Delete the record
    res.json({ success: true, message: `Record ${recordId} deleted successfully` });
  } catch (error) {
    console.log("Error Deleting Task Data !",err);
    res.status(500).json({error:"Error Deleting task ",success:false});
  }
}

const updateTask = async (req,res)=>{
  const {recordId,fields} = req.body;
  if(fields.length==0){
    return res.json({message:"send valid data in fields ",success:false});
  }
  try {
    const updatedTask = await base(TABLE_NAME).update(recordId,{fields});
    res.json({message:"updation successfull",success:true,data:updateTask});
  } catch (error) {
    console.log("Error updating task ",err);
    res.status(500).json({error:"Error Updating task ",success:false});
  }
}
module.exports = {
  addNewTask,updateTask,deleteTask,getTasks
}