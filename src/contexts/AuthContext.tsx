import { createContext } from "react";

export type User = {
  uid: string;
  name?: string;
  email?: string;
};

const AuthContext = createContext<{
  user: User | null;
}>({ user: null });

export default AuthContext;
