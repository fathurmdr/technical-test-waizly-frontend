import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AuthContext, { User } from "@/contexts/AuthContext";
import { auth, db } from "@/firebase/initialApp";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const initUser = JSON.parse(localStorage.getItem("@user") ?? "null");
  const [user, setUser] = useState<User | null>(initUser);
  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();

          localStorage.setItem("@isLogin", "true");
          setUser({
            uid: userSnap.id,
            name: userData.name ?? "",
            email: userData.email ?? "",
          });
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("@user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
