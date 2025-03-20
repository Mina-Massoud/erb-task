import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Todo } from '../App';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>({ duration: 150 });

  return (
    <ul ref={listRef} className="space-y-2">
      {todos.map(todo => (
        <li 
          key={todo.id} 
          className={`flex items-center gap-2 p-5 border rounded shadow-sm transition-all hover:shadow hover:-translate-y-1 ${
            todo.completed ? 'opacity-70' : ''
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-5 w-5 max-w-5 mr-5 border-gray-300 rounded transition-colors cursor-pointer"
          />
          <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>
            {todo.text}
          </span>
          <button 
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            className="ml-2 px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList; 