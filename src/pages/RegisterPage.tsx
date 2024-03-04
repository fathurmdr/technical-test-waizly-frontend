import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import ErrorInput from "@/components/ErrorInput";
import Spinner from "@/components/Spinner";
import TextInput from "@/components/TextInput";
import useAuth from "@/hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();

  const [registerPayload, setRegisterPayload] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeSignInPayload = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const name = event.target.name;
    const value = event.target.value;

    setRegisterPayload((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    register(registerPayload)
      .then((result) => {
        if (result.error) {
          setError(result.error);
          return;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          id="name"
          name="name"
          label="Name"
          placeholder="Enter your name"
          type="name"
          value={registerPayload.name}
          onChange={onChangeSignInPayload}
        />
        <TextInput
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={registerPayload.email}
          onChange={onChangeSignInPayload}
        />
        <TextInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={registerPayload.password}
          onChange={onChangeSignInPayload}
        />
        <ErrorInput
          data-testid="error-login"
          message={error}
          className="text-center"
        />
        <button
          type="submit"
          className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-black text-white"
        >
          {loading ? <Spinner size="small" color="white" /> : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link className="font-semibold text-teal-400" to="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
