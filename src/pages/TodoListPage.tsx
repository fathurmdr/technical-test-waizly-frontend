import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import useTodo, { Todo } from "@/hooks/useTodo";

function TodoListPage() {
  const { getTodos, updateTodo, deleteTodo } = useTodo();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then((result) => setTodos(result));
  }, []);

  const completedToggle = (id: string, todo: Todo) => {
    updateTodo(id, {
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline.toISOString(),
      completed: !todo.completed,
    }).then(() => {
      getTodos().then((result) => setTodos(result));
    });
  };

  const onDeleteTodo = (id: string) => {
    deleteTodo(id).then(() => {
      getTodos().then((result) => setTodos(result));
    });
  };

  return (
    <div>
      <div className="mb-4">
        <Link to="add" className="rounded-md bg-black px-3 py-2 text-white">
          Add Todo
        </Link>
      </div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="mb-4 flex items-center justify-between rounded-md border border-stroke p-4 shadow-4"
        >
          <div>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            <p>{dayjs(todo.deadline).format("DD MMM YYYY HH:mm")}</p>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => completedToggle(todo.id, todo)}
            />
            <Link to={`edit/${todo.id}`}>Edit</Link>
            <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoListPage;
