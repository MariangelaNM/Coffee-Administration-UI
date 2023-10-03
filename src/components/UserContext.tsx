// UserContext.tsx
import  { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
}
