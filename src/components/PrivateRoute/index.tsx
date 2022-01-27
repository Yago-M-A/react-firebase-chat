import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

type PrivateRouteProps = {
  children: JSX.Element
  redirectTo: string
}

const PrivateRoute = ({ children, redirectTo }: PrivateRouteProps) => {
  const { user } = useContext(AuthContext)
  return user.isLog ? children : <Navigate to={redirectTo} />
}

export default PrivateRoute
