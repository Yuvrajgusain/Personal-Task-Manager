import request from 'supertest';
import app from './app.js';
import { describe, test, expect } from '@jest/globals';


describe('Task API', () => {
    test('GET /api/tasks returns tasks', async () => {
        const res = await request(app).get('/api/tasks');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('POST /api/tasks creates a task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test Task',
                description: 'Testing API',
                dueDate: '2026-06-10',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe('Test Task');
        expect(res.body.data.completed).toBe(false);
    });

    test('POST /api/tasks rejects empty title', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({ title: '' });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test('PATCH /api/tasks/:id updates task', async () => {
        const createRes = await request(app)
            .post('/api/tasks')
            .send({ title: 'Old Task' });

        const id = createRes.body.data.id;

        const updateRes = await request(app)
            .patch(`/api/tasks/${id}`)
            .send({
                title: 'Updated Task',
                completed: true,
            });

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.success).toBe(true);
        expect(updateRes.body.data.title).toBe('Updated Task');
        expect(updateRes.body.data.completed).toBe(true);
    });

    test('DELETE /api/tasks/:id deletes task', async () => {
        const createRes = await request(app)
            .post('/api/tasks')
            .send({ title: 'Delete Me' });

        const id = createRes.body.data.id;

        const deleteRes = await request(app).delete(`/api/tasks/${id}`);

        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.success).toBe(true);
    });

    test('PATCH invalid id returns 404', async () => {
        const res = await request(app)
            .patch('/api/tasks/wrong-id')
            .send({ title: 'Updated' });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });
});