# Personal Task Manager

A full-stack task management application built with **React**, **Vite**, **Node.js**, and **Express.js**. The application allows users to create, update, delete, search, and manage tasks through a modern and responsive user interface.

## Features

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Filter tasks by status
* Search tasks instantly
* Task statistics dashboard
* Responsive modern UI
* REST API backend
* Automated API testing with Jest and Supertest

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS3

### Backend

* Node.js
* Express.js
* UUID
* CORS

### Testing

* Jest
* Supertest

## Project Structure

```text
Personal-Task-Manager/
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── index.js
│   ├── app.js
│   ├── tasks.test.js
│   └── package.json
│
├── package.json
└── README.md
```

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

### Create Task

```http
POST /api/tasks
```

### Update Task

```http
PATCH /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Yuvrajgusain/Personal-Task-Manager.git
cd Personal-Task-Manager
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

## Run Frontend

```bash
npm run dev
```

## Run Backend

```bash
cd server
npm run dev
```

## Run Tests

```bash
cd server
npm test
```

## Deployment

### Frontend

Deployed on Vercel

### Backend

Deployed on Render

## Author

**Yuvraj Gusain**

B.Tech Student | Java Developer | Full Stack Development Enthusiast


## Learning Resources & References

This project was developed as part of my effort as I am more comfortable with java development. 
During development, I referred to various learning resources including:

* Official React Documentation
* Official Vite Documentation
* Official Express.js Documentation
* Node.js Documentation
* MDN Web Docs
* YouTube tutorials on React, Express.js, and REST API development

These resources were used to understand concepts, project structure, API development, deployment, and frontend design patterns. The project was implemented, customized, tested, and deployed independently as a hands-on learning exercise.

As my primary background is in Java development, this project helped me gain practical experience with JavaScript-based full-stack application development.
