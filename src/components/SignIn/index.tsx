import * as S from './styles'
import { Formik, Form } from 'formik'
import validateForm from '../../utils/validateFormSignIn'
import Input from '../Input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../Loading'

type valuesProps = {
  [key: string]: string
}

type resetProps = {
  resetForm: (arg: valuesProps) => void
}

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onSubmit = async (values: valuesProps, { resetForm }: resetProps) => {
    const { email, password } = values
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const docRef = doc(db, 'Users', result.user.uid)
      const payload = { isOnline: true }
      await updateDoc(docRef, payload)
      resetForm({ values: '' })
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <S.Wrapper>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={onSubmit}
            validationSchema={validateForm}
          >
            {({ isValid }) => (
              <Form>
                <Input type="email" text="Email:" name="email" />
                <Input type="text" text="Password:" name="password" />
                <S.Button>
                  <button type="submit" disabled={!isValid}>
                    Entrar
                  </button>
                </S.Button>
              </Form>
            )}
          </Formik>
        </S.Wrapper>
      )}
    </>
  )
}

export default SignIn
