const FILTERS = ['All', 'Active', 'Completed'];

export default function FilterBar({ filter, onFilter, search, onSearch }) {
    return (
        <div className="filter-bar">
            <div className="filter-tabs">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => onFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>
            <div className="search-wrap">
                <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search tasks…"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                />
                {search && (
                    <button className="search-clear" onClick={() => onSearch('')} aria-label="Clear search">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
