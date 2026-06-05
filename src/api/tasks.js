const BASE = 'https://personal-task-manager-qtnx.onrender.com/api';

async function request(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data.data;
}

export const getTasks = () => request('/tasks');
export const createTask = (body) => request('/tasks', { method: 'POST', body: JSON.stringify(body) });
export const updateTask = (id, body) => request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
