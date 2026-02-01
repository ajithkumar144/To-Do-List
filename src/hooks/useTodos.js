import { useState, useEffect, useMemo } from 'react';

export const useTodos = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        if (!text.trim()) return;
        const newTodo = {
            id: crypto.randomUUID(),
            text: text.trim(),
            completed: false,
            createdAt: Date.now()
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? {
                ...todo,
                text: newText
            } : todo
        ));
    };

    const clearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.completed));
    };

    const reorderTodos = (fromIndex, toIndex) => {
        setTodos(prev => {
            const result = Array.from(prev);
            const [removed] = result.splice(fromIndex, 1);
            result.splice(toIndex, 0, removed);
            return result;
        });
    };

    const canReorder = filter === 'all' && !searchQuery;

    const filteredTodos = useMemo(() => {
        if (canReorder) return todos;

        return todos.filter(todo => {
            const matchesFilter =
                filter === 'all' ? true :
                    filter === 'active' ? !todo.completed :
                        filter === 'completed' ? todo.completed : true;

            const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesFilter && matchesSearch;
        }).sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            return b.createdAt - a.createdAt;
        });
    }, [todos, filter, searchQuery, canReorder]);

    const stats = useMemo(() => {
        const total = todos.length;
        const active = todos.filter(t => !t.completed).length;
        const completed = total - active;
        return { total, active, completed };
    }, [todos]);

    return {
        todos: filteredTodos,
        allTodosCount: todos.length,
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
    };
};
