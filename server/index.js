import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// In-memory storage
let tasks = [
  {
    id: uuidv4(),
    title: 'Read project documentation',
    description: 'Go through the full stack assessment brief carefully',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday (overdue)
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Set up development environment',
    description: 'Install Node.js, Vite, and dependencies',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Build the task manager app',
    description: 'Create a full-stack personal task manager with React + Express',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

// GET /api/tasks - get all tasks
app.get('/api/tasks', (req, res) => {
  const sorted = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json({ success: true, data: sorted });
});

// POST /api/tasks - create a task
app.post('/api/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'Title is required' });
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
  res.status(201).json({ success: true, data: task });
});

// PATCH /api/tasks/:id - update a task
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const { title, description, dueDate, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Title cannot be empty' });
    }
    tasks[index].title = title.trim();
  }
  if (description !== undefined) tasks[index].description = description.trim();
  if (dueDate !== undefined) tasks[index].dueDate = dueDate || null;
  if (completed !== undefined) tasks[index].completed = Boolean(completed);

  res.json({ success: true, data: tasks[index] });
});

// DELETE /api/tasks/:id - delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ success: true, message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
