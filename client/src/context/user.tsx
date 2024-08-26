import { ReactNode, createContext, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";

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
  
  const getUser = () => {
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