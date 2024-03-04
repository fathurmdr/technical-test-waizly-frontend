import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useAuth from "./useAuth";
import { db } from "@/firebase/initialApp";

export type Todo = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
};

type CreateTodoDto = {
  title: string;
  description: string;
  deadline: string;
};

type UpdateTodoDto = {
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
};

function useTodo() {
  const { user } = useAuth();

  const createTodo = async ({
    title,
    description,
    deadline,
  }: CreateTodoDto) => {
    const todoRef = doc(collection(db, "todos"));
    await setDoc(todoRef, {
      userId: user?.uid,
      title,
      description,
      deadline: new Date(deadline),
      completed: false,
    });
  };

  const getTodos = async () => {
    const todos: Todo[] = [];

    const todoRef = collection(db, "todos");
    const todoQuery = query(todoRef, where("userId", "==", user?.uid));
    const result = await getDocs(todoQuery);
    result.forEach((doc) => {
      todos.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        deadline: new Date(doc.data().deadline?.seconds * 1000),
        completed: doc.data().completed,
      });
    });

    return todos;
  };

  const getTodo = async (id: string) => {
    const todoRef = doc(db, "todos", id);
    const todoSnap = await getDoc(todoRef);

    const todo = todoSnap.data();

    if (todo) {
      return {
        title: todo.title,
        description: todo.description,
        deadline: new Date(todo.deadline?.seconds * 1000),
        completed: todo.completed,
      };
    }
  };

  const updateTodo = async (
    id: string,
    { title, description, deadline, completed }: UpdateTodoDto,
  ) => {
    const todoRef = doc(db, "todos", id);
    await setDoc(todoRef, {
      userId: user?.uid,
      title,
      description,
      deadline: new Date(deadline),
      completed,
    });
  };

  const deleteTodo = async (id: string) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  };

  return {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useTodo;
