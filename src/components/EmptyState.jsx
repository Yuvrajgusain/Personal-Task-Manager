export default function EmptyState({ filter, search, onAdd }) {
    if (search) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3 className="empty-title">No results for "{search}"</h3>
                <p className="empty-sub">Try a different keyword</p>
            </div>
        );
    }
    if (filter === 'Completed') {
        return (
            <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3 className="empty-title">Nothing completed yet</h3>
                <p className="empty-sub">Finish a task and it'll show up here</p>
            </div>
        );
    }
    if (filter === 'Active') {
        return (
            <div className="empty-state">
                <div className="empty-icon">✅</div>
                <h3 className="empty-title">All caught up!</h3>
                <p className="empty-sub">No active tasks — you're on top of things</p>
            </div>
        );
    }
    return (
        <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title">No tasks yet</h3>
            <p className="empty-sub">Add your first task to get started</p>
            <button className="btn-primary mt-4" onClick={onAdd}>+ Add your first task</button>
        </div>
    );
}
