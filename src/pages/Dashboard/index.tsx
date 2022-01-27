import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
  setDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FormEvent, useEffect, useState } from 'react'
import Message from '../../components/Message'
import MessageForm from '../../components/MessageForm'
import User from '../../components/User'
import { auth, db, storage } from '../../firebase/config'
import * as S from './styles'

type UserProps = {
  id: string
  name: string
  email: string
  password: string
  isOnline: boolean
  avatar: string
  avatarPath: string
  createdAt: Timestamp
}

type msgProps = {
  text: string
  to: string
  from: string
  createdAt: Timestamp
  media: string
}

const Dashboard = () => {
  console.log(auth.currentUser!.uid, 'uid')
  const [users, setUsers] = useState<UserProps[]>([])
  const [chat, setChat] = useState<UserProps>()
  const [text, setText] = useState('')
  const [img, setImg] = useState<File>()
  const [msgs, setMsgs] = useState<msgProps[]>([])
  const user1 = auth.currentUser!.uid
  useEffect(() => {
    const collectionRef = collection(db, 'Users')
    const q = query(collectionRef, where('id', 'not-in', [user1]))
    const unsub = onSnapshot(q, (snapshot) => {
      const usersArray: UserProps[] = []
      snapshot.forEach((doc) => {
        console.log(doc.data(), 'dashboard')
        const {
          id,
          name,
          email,
          password,
          createdAt,
          avatar,
          avatarPath,
          isOnline
        } = doc.data()
        const user: UserProps = {
          id,
          name,
          email,
          password,
          createdAt,
          avatar,
          avatarPath,
          isOnline
        }
        usersArray.push(user)
      })
      setUsers(usersArray)
    })
    return () => unsub()
  }, [])
  const selectUser = async (user: UserProps) => {
    setChat(user)
    const user2 = user.id
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const msgsRef = collection(db, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      const msgs: msgProps[] = []
      querySnapshot.forEach((doc) => {
        const { text, to, from, createdAt, media } = doc.data()
        const msg = { text, to, from, createdAt, media }
        msgs.push(msg)
      })
      console.log(msgs, 'mensagens')
      setMsgs(msgs)
    })
    const docSnap = await getDoc(doc(db, 'lastMsg', id))
    if (docSnap.data() && docSnap.data()?.from !== user1) {
      await updateDoc(doc(db, 'lastMsg', id), { unread: false })
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user2 = chat!.id
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    let url
    if (img) {
      const imgRef = ref(storage, `image/${new Date().getTime} - ${img.name}`)
      const snap = await uploadBytes(imgRef, img)
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlUrl
    }
    const collectionRef = collection(db, 'messages', id, 'chat')
    const payload = {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ''
    }
    await addDoc(collectionRef, payload)
    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true
    })
    setText('')
  }
  return (
    <S.Wrapper>
      <S.UsersContainer>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </S.UsersContainer>
      {chat ? (
        <S.MessageContainer>
          <S.MessageUser>
            <h3>{chat.name}</h3>
          </S.MessageUser>
          <S.Messages>
            {msgs.length
              ? msgs.map((msg, i) => (
                  <Message key={i} msg={msg} user1={user1} />
                ))
              : null}
          </S.Messages>
          <MessageForm
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
            setImg={setImg}
          />
        </S.MessageContainer>
      ) : (
        <S.Conv>
          <h3>Select a user to start conversation</h3>
        </S.Conv>
      )}
    </S.Wrapper>
  )
}

export default Dashboard
