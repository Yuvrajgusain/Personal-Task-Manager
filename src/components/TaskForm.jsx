import { useState, useEffect, useRef } from 'react';

const today = () => new Date().toISOString().split('T')[0];

export default function TaskForm({ onSubmit, onCancel, initialData = null }) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const titleRef = useRef(null);

    useEffect(() => { titleRef.current?.focus(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) { setError('Title is required'); return; }
        setError('');
        setSubmitting(true);
        try {
            await onSubmit({ title: title.trim(), description: description.trim(), dueDate: dueDate || null });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="task-form-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
            <div className="task-form-modal">
                <div className="modal-header">
                    <h2 className="modal-title">{initialData ? 'Edit Task' : 'New Task'}</h2>
                    <button className="icon-btn close-btn" onClick={onCancel} aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label className="form-label">Title <span className="required">*</span></label>
                        <input
                            ref={titleRef}
                            className={`form-input ${error ? 'input-error' : ''}`}
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value); setError(''); }}
                            placeholder="What needs to be done?"
                            maxLength={100}
                        />
                        {error && <span className="error-msg">{error}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description <span className="optional">optional</span></label>
                        <textarea
                            className="form-input form-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add more details..."
                            rows={3}
                            maxLength={500}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Due Date <span className="optional">optional</span></label>
                        <input
                            className="form-input"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={today()}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-ghost" onClick={onCancel} disabled={submitting}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? (
                                <span className="btn-loader"><span className="spinner-sm" /> {initialData ? 'Saving…' : 'Adding…'}</span>
                            ) : (initialData ? 'Save Changes' : 'Add Task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
