import { onAuthStateChanged } from 'firebase/auth'
import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import { auth } from '../firebase/config'

type userProps = {
  isLog: boolean
  user: string | null
}

type AuthContextProps = {
  user: userProps
  setUser: Dispatch<SetStateAction<userProps>>
}
export const AuthContext = createContext({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<userProps>({ isLog: false, user: null })
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (result) => {
      if (result) {
        setUser({ isLog: !!result, user: result.uid })
      }
    })

    return () => {
      unsub()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
