require('dotenv').config();
const express = require("express");
const Airtable = require("airtable");

const app = express();
app.use(express.json());

// Airtable Configuration
const base = new Airtable({ apiKey: process.env.API_key }).base(process.env.AIRTABLE_BASE_ID);
const TABLE_NAME = process.env.TableName;

// 🔹 CREATE a new task (POST)
app.post("/tasks", async (req, res) => {
    const { name, status, priority } = req.body;
    if (!name || !status || !priority) return res.status(400).json({ error: "All fields are required" });
    // console.log(req.body);x
    try {
        const record = await base(TABLE_NAME).create([{ fields: { "Task Name": name, "Status": status, "Priority": priority } }]);
        res.status(201).json({ message: "Task created", task: record[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 READ all tasks (GET)
app.get("/tasks", async (req, res) => {
    try {
        const records = await base(TABLE_NAME).select({}).all();
        console.log(records);

        const tasks = records.map(record => ({ id: record.id, ...record.fields }));
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 UPDATE a task by ID (PATCH)
app.patch("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { name, status, priority } = req.body;
    console.log("req.body",req.body);

    try {
        const updatedRecord = await base(TABLE_NAME).update([
            { id, fields: { "Task Name": name, "Status": status, "Priority": priority } }
        ]);

        res.json({ message: "Task updated", task: updatedRecord[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 DELETE a task by ID (DELETE)
app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await base(TABLE_NAME).destroy([id]);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
