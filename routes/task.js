const express = require("express");
const pool = require("../models/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;
        next();
    });
}

// Getting all tasks for logged-in user
router.get("/", authenticateToken, async (req, res) => {
    const tasks = await pool.query("SELECT * FROM tasks WHERE userId = $1", [req.user.id]);
    res.json(tasks.rows);
});

// Create new task
router.post("/", authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const newTask = await pool.query(
        "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *", 
        [title, description, req.user.id]
    );
    res.status(201).json(newTask.rows[0]); // Return the full task object
});

// Update task 
router.put("/:id", authenticateToken, async (req, res) => {
    const { title, description, isComplete } = req.body;

    try {
        if (title !== undefined || description !== undefined) {
            await pool.query(
                "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND userid = $4",
                [title, description, req.params.id, req.user.id]
            );
        }

        if (isComplete !== undefined) {
            await pool.query(
                "UPDATE tasks SET iscomplete = $1 WHERE id = $2 AND userid = $3",
                [isComplete, req.params.id, req.user.id]
            );
        }

        res.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
});



// Delete a task
router.delete("/:id", authenticateToken, async (req, res) => {
    await pool.query("DELETE FROM tasks WHERE id = $1 AND userId = $2", [req.params.id, req.user.id]);
    res.json({ message: "Task deleted" });
});

module.exports = router;
