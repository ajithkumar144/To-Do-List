
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit, onReorder, canReorder }) {

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
        if (sourceIndex !== targetIndex) {
            onReorder(sourceIndex, targetIndex);
        }
    };

    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No tasks yet</h3>
                <p>Add a task above to get started.</p>
            </div>
        );
    }

    return (
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    index={index}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    draggable={canReorder}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />
            ))}
        </ul>
    );
}

export default TodoList;
