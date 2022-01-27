import * as S from './styles'
import { Formik, Form } from 'formik'
import validateForm from '../../utils/validateFormSignUp'
import Input from '../Input'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

type valuesProps = {
  [key: string]: string
}

type resetProps = {
  resetForm: (arg: valuesProps) => void
}

const SignUp = () => {
  const onSubmit = async (values: valuesProps, { resetForm }: resetProps) => {
    const { name, email, password } = values
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const docRef = doc(db, 'Users', result.user.uid)
      const payload = {
        id: result.user.uid,
        email,
        password,
        name,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true
      }
      await setDoc(docRef, payload)
      resetForm({ values: '' })
      console.log(values)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <S.Wrapper>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={onSubmit}
        validationSchema={validateForm}
      >
        {({ isValid }) => (
          <Form>
            <Input text="Name:" name="name" type="text" />
            <Input type="email" text="Email:" name="email" />
            <Input type="text" text="Password:" name="password" />
            <Input
              type="text"
              text="Comfirm Password:"
              name="confirmPassword"
            />
            <S.Button>
              <button type="submit" disabled={!isValid}>
                Enviar
              </button>
            </S.Button>
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  )
}

export default SignUp
