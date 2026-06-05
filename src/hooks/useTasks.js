import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {
        try {
            setError(null);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchTasks(); }, [fetchTasks]);

    const addTask = async (taskData) => {
        const task = await createTask(taskData);
        setTasks((prev) => [task, ...prev]);
        return task;
    };

    const editTask = async (id, changes) => {
        const task = await updateTask(id, changes);
        setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
        return task;
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleTask = async (id) => {
        const task = tasks.find((t) => t.id === id);
        return editTask(id, { completed: !task.completed });
    };

    return { tasks, loading, error, addTask, editTask, removeTask, toggleTask, refetch: fetchTasks };
}
