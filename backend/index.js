// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connect to MongoDB (you need to have MongoDB running)
mongoose.connect("mongodb://localhost/tasksdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define the task schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: "todo", // Set the default value to 'pending'
  },
  storyPoints: Number,
});

const Task = mongoose.model("Task", TaskSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new task
app.post("/create-task", (req, res) => {
  const task = new Task(req.body);

  if (!task.title) {
    return res.status(400).json({ error: "Title is required." });
  }

  task.save().then(
    (savedTask) => {
      res.status(201).json(savedTask);
    },
    (err) => {
      res.status(500).json({ error: "Error saving the task." });
    }
  );
});

async function getTasks() {
  const tasks = await Task.find({});
  return tasks;
}
// Get all tasks
app.get("/tasks", (req, res) => {
  getTasks().then(
    function (tasks) {
      res.json(tasks);
    },
    function (error) {
      res.status(500).json({ error: "Error fetching tasks." });
    }
  );
});

// Update a task by ID
app.put("/task/:taskId", (req, res) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true }).then(
    (updatedTask) => {
      res.json(updatedTask);
    },
    (err) => {
      res.status(500).json({ error: "Error updating the task." });
    }
  );
});

// Delete a task by ID
app.delete("/task/:taskId", (req, res) => {
  Task.findByIdAndRemove(req.params.taskId).then(
    () => {
      res.status(204).end();
    },
    (err) => {
      res.status(500).json({ error: "Error deleting the task." });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
