import * as S from './styles'
import { BsFillChatTextFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { auth, db } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const Header = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext)
  const handleLogout = async () => {
    const id = auth.currentUser!.uid
    const docRef = doc(db, 'Users', id)
    const payload = { isOnline: false }
    await updateDoc(docRef, payload)
    await signOut(auth)
    setUser({ isLog: false, user: null })
    navigate('/login')
  }
  return (
    <S.Wrapper>
      <S.Logo>
        <Link to={'/'}>
          <BsFillChatTextFill />
        </Link>
      </S.Logo>
      <S.Nav>
        <nav>
          {/* {user.isLog ? (
            <>
              <NavLink to={'/profile'}>Profile</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to={'/'}>Home</NavLink>
              <button onClick={() => navigate('/login')}>Login</button>
            </>
          )} */}
          {user.isLog && (
            <>
              <NavLink to={'/profile'}>Profile</NavLink>
              <NavLink to={'/dashboard'}>Dashboard</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          {!user.isLog && (
            <>
              <NavLink to={'/'}>Home</NavLink>
              <button onClick={() => navigate('/login')}>Login</button>
            </>
          )}
        </nav>
      </S.Nav>
    </S.Wrapper>
  )
}

export default Header
