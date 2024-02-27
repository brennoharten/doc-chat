/* import { createContext, ReactNode } from "react";
import { useCollection } from "@/hooks/useCollection";
import UserDoc from "@/types/user";

interface ContextProps {
  users?: UserDoc[] | undefined; 
}

export const UsersContext = createContext<ContextProps>({ users: undefined });

interface UsersProviderProps {
  children: ReactNode;
  userDoc: UserDoc; 
}

export function UsersProvider({ children }: UsersProviderProps) {
  const { documents: value } = useCollection("users");

  const users = value === null ? undefined : value;

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  );
}
 */

import { createContext } from "react";
import { useCollection } from "@/hooks/useCollection";

export const UsersContext = createContext();

export function UsersProvider({ children, userDoc }) {
  const { documents: users } = useCollection("users", [
    "teamId",
    "==",
    userDoc.teamId,
  ]);

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
}
