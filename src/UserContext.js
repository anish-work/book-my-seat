import React, { useEffect, useState } from "react";
import { auth, generateUserInfo } from "./firebase";

export const UserContext = React.createContext();
export function UserProvider(props) {
  const [user, setUser] = useState({ user: null });

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const userData = await generateUserInfo(userAuth);
      setUser({ user: userData });
      localStorage.setItem('userData', JSON.stringify(userData));
    });
  }, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
