import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TodoListPage from "./pages/TodoListPage";
import useAuth from "./hooks/useAuth";
import ErrorPage from "./pages/ErrorPage";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" /> : <AuthLayout />}
          errorElement={<ErrorPage />}
        >
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>
        <Route
          path="/"
          element={user ? <MainLayout /> : <Navigate to="/auth/login" />}
          errorElement={<ErrorPage />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/todo-list" element={<TodoListPage />} />
          <Route path="/todo-list/add" element={<CreateTodo />} />
          <Route path="/todo-list/edit/:id" element={<UpdateTodo />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
