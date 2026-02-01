import { useState, useRef, useEffect } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit, index, onDragStart, onDragOver, onDrop, draggable }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(todo.id, editText);
            setIsEditing(false);
        } else {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <li
            className={`todo-item ${todo.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
            draggable={draggable && !isEditing}
            onDragStart={(e) => {
                setIsDragging(true);
                onDragStart(e, index);
            }}
            onDragEnd={() => {
                setIsDragging(false);
                setIsDragOver(false);
            }}
            onDragOver={(e) => {
                e.preventDefault();
                if (draggable) setIsDragOver(true);
                onDragOver(e, index);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
                setIsDragOver(false);
                onDrop(e, index);
            }}
        >
            <div className="todo-content">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                    />
                </label>

                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
                        {todo.text}
                    </span>
                )}
            </div>

            <div className="item-actions">
                <button
                    className="action-btn edit"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit"
                >
                    ✎
                </button>
                <button
                    className="action-btn delete"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete"
                >
                    ×
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
