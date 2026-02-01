import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const {
    todos,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos,
    canReorder
  } = useTodos();

  return (
    <div className="container">
      <header className="app-header">
        <h1>To-Do List</h1>
        <p className="date-display">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>

        <div className="stats-card">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <TodoForm onAdd={addTodo} />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onReorder={reorderTodos}
          canReorder={canReorder}
        />
      </main>

      {stats.completed > 0 && (
        <footer className="app-footer">
          <button className="clear-btn" onClick={clearCompleted}>
            Clear Completed Tasks
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
