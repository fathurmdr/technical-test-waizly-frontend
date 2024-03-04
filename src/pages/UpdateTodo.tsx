import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import TextInput from "@/components/TextInput";
import useTodo from "@/hooks/useTodo";
import Spinner from "@/components/Spinner";

function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTodo, getTodo } = useTodo();

  const [updateTodoPayload, setUpdateTodoPayload] = useState({
    title: "",
    description: "",
    deadline: "",
    completed: true,
  });
  const [loading, setLoading] = useState(false);

  const onChangeUpdateTodoPayload = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setUpdateTodoPayload((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (id) {
      setLoading(true);
      updateTodo(id, {
        title: updateTodoPayload.title,
        description: updateTodoPayload.description,
        deadline: updateTodoPayload.deadline,
        completed: updateTodoPayload.completed,
      })
        .then(() => {
          navigate(-1);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (id) {
      getTodo(id).then((result) => {
        if (result) {
          setUpdateTodoPayload({
            title: result.title,
            description: result.description,
            deadline: dayjs(result.deadline).toISOString().slice(0, 16),
            completed: result.completed,
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          id="title"
          name="title"
          label="Title"
          placeholder="Enter title"
          type="text"
          value={updateTodoPayload.title}
          onChange={onChangeUpdateTodoPayload}
        />
        <TextInput
          id="description"
          name="description"
          label="Description"
          placeholder="Enter description"
          type="text"
          value={updateTodoPayload.description}
          onChange={onChangeUpdateTodoPayload}
        />
        <TextInput
          id="deadline"
          name="deadline"
          label="Deadline"
          placeholder="Enter deadline"
          type="datetime-local"
          value={updateTodoPayload.deadline}
          onChange={onChangeUpdateTodoPayload}
        />
        <button
          type="submit"
          className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-black text-white"
        >
          {loading ? <Spinner size="small" color="white" /> : "Create Todo"}
        </button>
      </form>
    </div>
  );
}

export default UpdateTodo;
