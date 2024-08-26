import { ReactNode, createContext, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import UserService from "../services/user.service";

interface Props {
  children: ReactNode
}

type UserContext = {
  initializeUser: (user: UserInterface) => void
  getUser: () => UserInterface | null
}

export const UserContext = createContext({} as UserContext)

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserInterface | null>(null)

  const initializeUser = (user: UserInterface) => {
    setUser(user)
  }
  
  const getUser = async () => {
    if (!user) {
      try {
        const response = await UserService.me()
        initializeUser(response.data.user)
      } catch (error) {
        alert("Error en la conexión: " + error);
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