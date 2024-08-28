import { ReactNode, createContext, useState } from "react";
import { UserData } from "../interfaces/UserInterface";
import UserService from "../services/user.service";

interface Props {
  children: ReactNode
}

type UserContext = {
  initializeUser: (user: UserData | null) => void
  getUser: () => Promise<UserData | null>
}

export const UserContext = createContext({} as UserContext)

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null)

  const initializeUser = (user: UserData | null) => {
    setUser(user)
  }
  
  const getUser = async (): Promise<UserData | null> => {
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