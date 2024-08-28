import { ReactNode, createContext, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import UserService from "../services/user.service";

interface Props {
  children: ReactNode
}

type UserContext = {
  initializeUser: (user: UserInterface | null) => void
  getUser: () => Promise<UserInterface | null>
}

export const UserContext = createContext({} as UserContext)

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserInterface | null>(null)

  const initializeUser = (user: UserInterface | null) => {
    setUser(user)
  }
  
  const getUser = async (): Promise<UserInterface | null> => {
    if (!user) {
      const response = await UserService.me();
      if (response && response.data?.user) {
        initializeUser(response.data.user);
        return response.data.user;
      }
      
      return null;
    }

    return user
  }

  return (
    <UserContext.Provider value={{
      initializeUser,
      getUser,
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider