import * as S from './styles'
import Img from '../../assets/img/R.png'
import { BsFillCameraFill, BsTrashFill } from 'react-icons/bs'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject
} from 'firebase/storage'
import { auth, db, storage } from '../../firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Loading from '../../components/Loading'

type UserProps = {
  id: string
  name: string
  email: string
  avatar: string
  date: string
  avatarPath: string
}

const Profile = () => {
  const [img, setImg] = useState<File>()
  const [user, setUser] = useState({} as UserProps)
  const [loading, setLoading] = useState(true)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  const deleteImage = async () => {
    await deleteObject(ref(storage, user.avatarPath))
    const docRef = doc(db, 'Users', user.id)
    const payload = { avatar: '', avatarPath: '' }
    await updateDoc(docRef, payload)
    setUser((prev) => ({ ...prev, avatar: '', avatarPath: '' }))
  }
  useEffect(() => {
    const fetchDoc = async () => {
      await getDoc(doc(db, 'Users', auth.currentUser!.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          console.log(docSnap.data())
          const { id, name, email, avatar, createdAt, avatarPath } =
            docSnap.data()
          const date = createdAt.toDate().toDateString()
          setUser({ id, name, email, avatar, date, avatarPath })
        }
      })
      setLoading(false)
    }

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        )
        setLoading(true)
        if (user.avatarPath) {
          await deleteObject(ref(storage, user.avatarPath))
        }
        const snap = await uploadBytes(imgRef, img)
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        const docRef = doc(db, 'Users', auth.currentUser!.uid)
        const payload = { avatar: url, avatarPath: snap.ref.fullPath }
        await updateDoc(docRef, payload)
        setImg(undefined)
      }
      uploadImg()
    }
    fetchDoc()
    return () => setLoading(false)
  }, [img, user.avatarPath])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <S.Container>
          <S.Wrapper>
            <S.Image>
              <img src={user.avatar || Img} alt="Avatar" />
              <S.Overlay>
                <label htmlFor="photo">
                  <BsFillCameraFill />
                </label>
                {user.avatar && <BsTrashFill onClick={deleteImage} />}
                <input
                  id="photo"
                  accept="image/*"
                  type="file"
                  onChange={handleChange}
                />
              </S.Overlay>
            </S.Image>
            <S.Info>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <hr />
              <small>Join on: {user.date}</small>
            </S.Info>
          </S.Wrapper>
        </S.Container>
      )}
    </>
  )
}

export default Profile
