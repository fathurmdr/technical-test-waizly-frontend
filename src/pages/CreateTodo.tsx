import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/TextInput";
import useTodo from "@/hooks/useTodo";
import Spinner from "@/components/Spinner";

function CreateTodo() {
  const { createTodo } = useTodo();
  const navigate = useNavigate();

  const [createTodoPayload, setCreateTodoPayload] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeCreateTodoPayload = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setCreateTodoPayload((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    createTodo(createTodoPayload)
      .then(() => {
        navigate(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          id="title"
          name="title"
          label="Title"
          placeholder="Enter title"
          type="text"
          value={createTodoPayload.title}
          onChange={onChangeCreateTodoPayload}
        />
        <TextInput
          id="description"
          name="description"
          label="Description"
          placeholder="Enter description"
          type="text"
          value={createTodoPayload.description}
          onChange={onChangeCreateTodoPayload}
        />
        <TextInput
          id="deadline"
          name="deadline"
          label="Deadline"
          placeholder="Enter deadline"
          type="datetime-local"
          value={createTodoPayload.deadline}
          onChange={onChangeCreateTodoPayload}
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

export default CreateTodo;
