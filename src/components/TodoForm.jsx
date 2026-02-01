import { useState } from 'react';

function TodoForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />

                <button type="submit" className="add-btn" disabled={!text.trim()}>
                    Add Task
                </button>
            </div>
        </form>
    );
}

export default TodoForm;
