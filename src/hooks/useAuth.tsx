import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { auth, db } from "@/firebase/initialApp";
import AuthContext from "@/contexts/AuthContext";

type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

type LoginDto = {
  email: string;
  password: string;
};

function useAuth() {
  const { user } = useContext(AuthContext);

  const register = async ({ name, email, password }: RegisterDto) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        name,
        email,
      });

      return { name, email };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  };

  const login = async ({ email, password }: LoginDto) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  };

  return {
    register,
    login,
    user,
  };
}

export default useAuth;
