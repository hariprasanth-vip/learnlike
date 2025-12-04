import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory "database"
let tasks = [];
let id = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  const task = { id: id++, text, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// Update task status
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  task.done = !task.done;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
