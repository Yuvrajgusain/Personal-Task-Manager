import { useState } from 'react';

function isOverdue(dueDate, completed) {
    if (!dueDate || completed) return false;
    return new Date(dueDate) < new Date(new Date().toDateString());
}

function formatDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
    const [toggling, setToggling] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const overdue = isOverdue(task.dueDate, task.completed);

    const handleToggle = async () => {
        setToggling(true);
        try { await onToggle(task.id); } finally { setToggling(false); }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${task.title}"? This cannot be undone.`)) return;
        setDeleting(true);
        try { await onDelete(task.id); } catch { setDeleting(false); }
    };

    return (
        <div className={`task-card ${task.completed ? 'task-completed' : ''} ${overdue ? 'task-overdue' : ''} ${deleting ? 'task-deleting' : ''}`}>
            <div className="task-card-left">
                <button
                    className={`checkbox ${task.completed ? 'checked' : ''} ${toggling ? 'toggling' : ''}`}
                    onClick={handleToggle}
                    aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                    disabled={toggling}
                >
                    {task.completed && (
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </button>
            </div>

            <div className="task-card-body">
                <h3 className="task-title">{task.title}</h3>
                {task.description && <p className="task-desc">{task.description}</p>}
                <div className="task-meta">
                    {task.dueDate && (
                        <span className={`due-badge ${overdue ? 'due-overdue' : task.completed ? 'due-done' : 'due-upcoming'}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
                            {overdue ? '⚠ Overdue · ' : ''}{formatDate(task.dueDate)}
            </span>
                    )}
                    <span className="created-badge">
            Added {new Date(task.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
                </div>
            </div>

            <div className="task-card-actions">
                <button className="icon-btn edit-btn" onClick={() => onEdit(task)} aria-label="Edit task" title="Edit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button className="icon-btn delete-btn" onClick={handleDelete} aria-label="Delete task" title="Delete" disabled={deleting}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
