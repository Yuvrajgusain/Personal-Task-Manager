import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
    const sorted = [...tasks].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({ success: true, data: sorted });
});

app.post('/api/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Title is required',
        });
    }

    const task = {
        id: uuidv4(),
        title: title.trim(),
        description: description?.trim() || '',
        dueDate: dueDate || null,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    tasks.push(task);

    res.status(201).json({
        success: true,
        data: task,
    });
});

app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Task not found',
        });
    }

    const { title, description, dueDate, completed } = req.body;

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Title cannot be empty',
            });
        }

        tasks[index].title = title.trim();
    }

    if (description !== undefined) {
        tasks[index].description = description.trim();
    }

    if (dueDate !== undefined) {
        tasks[index].dueDate = dueDate || null;
    }

    if (completed !== undefined) {
        tasks[index].completed = Boolean(completed);
    }

    res.json({
        success: true,
        data: tasks[index],
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Task not found',
        });
    }

    tasks.splice(index, 1);

    res.json({
        success: true,
        message: 'Task deleted',
    });
});

export default app;