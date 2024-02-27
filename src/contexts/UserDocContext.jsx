/* import { createContext, ReactNode } from "react";
import { useDocument } from "@/hooks/useDocument";
import UserDoc from "@/types/user";

interface ContextProps {
  userDoc?: UserDoc | undefined;
}

export const UserDocContext = createContext<ContextProps>({
  userDoc: undefined
});

interface UserDocProviderProps {
  children: ReactNode;
  user: { uid: string }; // Supondo que user tenha uma propriedade uid
}

export function UserDocProvider({ children, user }: UserDocProviderProps) {
  const { document: userDoc } = useDocument("users", user.uid);

  // Adicione uma verificação para garantir que userDoc seja undefined se for null
  const value = { userDoc: userDoc === null ? undefined : userDoc };

  return (
    <UserDocContext.Provider value={value}>
      {children}
    </UserDocContext.Provider>
  );
}
 */

import { createContext } from "react";
import { useDocument } from "@/hooks/useDocument";

export const UserDocContext = createContext();

export function UserDocProvider({ children, user }) {
	const { document: userDoc } = useDocument("users", user.uid);

	return (
		<UserDocContext.Provider value={{ userDoc }}>
			{children}
		</UserDocContext.Provider>
	);
}
