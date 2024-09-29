const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const express = require("express");
const cors = require("cors");

const router = express.Router();
router.use(cors());
router.use(authMiddleware);

// Get Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Create task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    Task.create({
      title,
      description,
      user: req.user.id,
      status,
    });
    res.status(201).json({ message: "Task Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status, updatedAt: Date.now() }, // Update status
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
