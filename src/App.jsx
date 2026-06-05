import { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import './App.styles.css';

export default function App() {
  const { tasks, loading, error, addTask, editTask, removeTask, toggleTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = tasks;
    if (filter === 'Active') list = list.filter((t) => !t.completed);
    if (filter === 'Completed') list = list.filter((t) => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
          (t) =>
              t.title.toLowerCase().includes(q) ||
              t.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, filter, search]);

  const handleAdd = async (data) => {
    await addTask(data);
    setShowForm(false);
  };

  const handleEdit = async (data) => {
    await editTask(editingTask.id, data);
    setEditingTask(null);
  };

  return (
      <div className="app">
        {/* Background decoration */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />

        <div className="container">
          {/* Header */}
          <header className="header">
            <div className="header-left">
              <div className="logo-mark">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                      d="M9 11l3 3L22 4"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                      stroke="var(--accent2)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="app-title">Task Manager</h1>
                <p className="app-sub">Stay focused. Get things done.</p>
              </div>
            </div>
            <button className="btn-primary add-btn" onClick={() => setShowForm(true)}>
              <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Task
            </button>
          </header>

          {/* Sidebar: stats + filters */}
          <aside className="sidebar">
            {tasks.length > 0 && <StatsBar tasks={tasks} />}
            <FilterBar
                filter={filter}
                onFilter={setFilter}
                search={search}
                onSearch={setSearch}
            />
          </aside>

          {/* Main task list */}
          <main className="task-list-wrap">
            {/* Error banner */}
            {error && (
                <div className="error-banner">
                  <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
            )}

            {loading ? (
                <div className="loading-wrap">
                  {[1, 2, 3].map((i) => (
                      <div
                          key={i}
                          className="skeleton-card"
                          style={{ animationDelay: `${i * 0.1}s` }}
                      />
                  ))}
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState
                    filter={filter}
                    search={search}
                    onAdd={() => setShowForm(true)}
                />
            ) : (
                <div className="task-list">
                  {filtered.map((task) => (
                      <TaskCard
                          key={task.id}
                          task={task}
                          onToggle={toggleTask}
                          onEdit={setEditingTask}
                          onDelete={removeTask}
                      />
                  ))}
                </div>
            )}
          </main>

          {/* Footer */}
          <footer className="footer">
          <span>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </span>
            <span>Personal Task Manager</span>
          </footer>
        </div>

        {/* Modals */}
        {showForm && (
            <TaskForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
        )}
        {editingTask && (
            <TaskForm
                initialData={editingTask}
                onSubmit={handleEdit}
                onCancel={() => setEditingTask(null)}
            />
        )}
      </div>
  );
}
