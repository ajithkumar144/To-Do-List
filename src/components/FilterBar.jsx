

function FilterBar({ filter, setFilter, searchQuery, setSearchQuery }) {
    return (
        <div className="filter-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />

            <div className="filter-tabs">
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBar;
