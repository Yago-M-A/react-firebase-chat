import { doc, onSnapshot, Timestamp } from 'firebase/firestore'
import * as S from './styles'
import Img from '../../assets/img/R.png'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'

type User = {
  id: string
  name: string
  email: string
  password: string
  isOnline: boolean
  avatar: string
  avatarPath: string
  createdAt: Timestamp
}

type DataProps = {
  text: string
  from: string
  to: string
  createdAt: Timestamp
  media: string
  unread: boolean
}

type UserProps = {
  user: User
  selectUser: (user: User) => void
  user1: string
  chat?: User
}

const User = ({ user, selectUser, user1, chat }: UserProps) => {
  const user2 = user.id
  const [data, setData] = useState<DataProps>()
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      if (doc.exists()) {
        const { text, from, to, createdAt, media, unread } = doc.data()
        setData({ text, from, to, createdAt, media, unread })
      }
    })
    return () => unsub()
  }, [user1, user2])
  console.log(data, 'data')
  return (
    <>
      <S.Wrapper
        selected={chat?.name === user.name ? 'selected' : undefined}
        onClick={() => selectUser(user)}
      >
        <S.Info>
          <S.Details>
            <S.Avatar>
              <img src={user.avatar || Img} alt="Avatar" />
            </S.Avatar>
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unread && <small>New</small>}
          </S.Details>
          <S.Status online={user.isOnline} />
        </S.Info>
        {data && (
          <S.Truncate>
            <strong>{data.from === user1 ? 'Me: ' : null}</strong>
            {data.text}
          </S.Truncate>
        )}
      </S.Wrapper>
      <S.SMWrapper
        onClick={() => selectUser(user)}
        selected={chat?.name === user.name ? 'selected' : undefined}
      >
        <img src={user.avatar || Img} alt="Avatar" />
      </S.SMWrapper>
    </>
  )
}

export default User
