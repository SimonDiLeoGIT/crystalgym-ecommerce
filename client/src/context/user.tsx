import { ReactNode, createContext, useState } from "react";
import { UserDataInterface } from "../interfaces/UserInterface";
import UserService from "../services/user.service";

interface Props {
  children: ReactNode
}

type UserContext = {
  initializeUser: (user: UserDataInterface | null) => void
  getUser: () => Promise<UserDataInterface | null>
}

export const UserContext = createContext({} as UserContext)

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserDataInterface | null>(null)

  const initializeUser = (user: UserDataInterface | null) => {
    setUser(user)
  }
  
  const getUser = async (): Promise<UserDataInterface | null> => {
    if (!user) {
      try {
        const response = await UserService.me();
        if (response) {
          initializeUser(response.data.user);
          return response.data.user;
        }
      } catch (error) {
        return null;
      }
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