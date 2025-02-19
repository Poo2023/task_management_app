import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Tasks.css";

interface Task {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);
    
    

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks", {
                headers: { Authorization: token },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (editingTask) {
            try {
                const taskToUpdate = tasks.find(task => task.id === editingTask.id);
                if (!taskToUpdate) return; 
                await axios.put(
                    `http://localhost:5000/tasks/${editingTask.id}`,
                    { 
                        title, 
                        description, 
                        isComplete: taskToUpdate.isComplete 
                    },
                    { headers: { Authorization: token } }
                );
                    setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === editingTask.id ? { ...task, title, description } : task
                    )
                );
    
                setEditingTask(null);
                setTitle("");
                setDescription("");
            } catch (error) {
                console.error("Error updating task", error);
            }
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:5000/tasks",
                    { title, description },
                    { headers: { Authorization: token } }
                );
    
                const newTask = response.data;
    
                setTasks(prevTasks => [...prevTasks, newTask]);
                setTitle("");
                setDescription("");
            } catch (error) {
                console.error("Error creating task", error);
            }
        }
    };
    

    // Edit Task 
    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description);
    };

    // Toggle task completion
    const handleToggleTask = async (id: number, currentStatus: boolean) => {
        try {
            await axios.put(
                `http://localhost:5000/tasks/${id}`,
                { isComplete: !currentStatus },
                { headers: { Authorization: token } }
            );
 
            setTasks(prevTasks =>
                prevTasks
                    .map(task =>
                        task.id === id ? { ...task, isComplete: !currentStatus } : task
                    )
                    .sort((a, b) => Number(a.isComplete) - Number(b.isComplete)) 
            );
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // ✅ Remove JWT token
        navigate("/"); // ✅ Redirect to login page
    };
    
    
    

    // Delete Task
    const handleDeleteTask = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`, { headers: { Authorization: token } });
            setTasks(tasks.filter(task => task.id !== id)); 
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    return (

        <div className="tasks-container">
            <div className="header">
            <button className="logout-button" onClick={handleLogout}>Logout</button> 
            </div>
            <h2>Task Management Application</h2>
            
            <form className="task-form" onSubmit={handleTaskSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
                {editingTask && <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>}
            </form>
            {/* To Do Tasks */}
            <h3>To Do</h3>
            <ul className="task-list">
                {tasks.filter(task => !task.isComplete).map((task) => (
                    <li key={task.id} className="task-item">
                        <div className="task-info">
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                        </div>
                        <button onClick={() => handleToggleTask(task.id, task.isComplete)}>Complete</button>
                        <button onClick={() => handleEditTask(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Completed Tasks */}
            <h3>Completed</h3>
            <ul className="task-list completed-list">
                {tasks.filter(task => task.isComplete).map((task) => (
                    <li key={task.id} className="task-item">
                        <div className="task-info">
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                        </div>
                        <button onClick={() => handleToggleTask(task.id, task.isComplete)}>Undo</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>


            </div>
    );
};

export default Tasks;
