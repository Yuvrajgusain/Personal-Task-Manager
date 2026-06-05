export default function StatsBar({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const overdue = tasks.filter(
        (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString())
    ).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="stats-bar">
            <div className="stat-item">
                <span className="stat-num">{total}</span>
                <span className="stat-label">Total</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
                <span className="stat-num active-num">{active}</span>
                <span className="stat-label">Active</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
                <span className="stat-num done-num">{completed}</span>
                <span className="stat-label">Done</span>
            </div>
            {overdue > 0 && (
                <>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-num overdue-num">{overdue}</span>
                        <span className="stat-label">Overdue</span>
                    </div>
                </>
            )}
            <div className="stat-progress-wrap">
                <div className="stat-progress-track">
                    <div className="stat-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="stat-pct">{pct}%</span>
            </div>
        </div>
    );
}
