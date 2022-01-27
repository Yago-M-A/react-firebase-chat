import { Field, ErrorMessage } from 'formik'
import * as S from './styles'

type InputProps = {
  text: string
  name: string
  type?: string
  as?: string
}

const Input = ({ text, name, type, as }: InputProps) => (
  <>
    <S.Input>
      <label htmlFor={name}>{text}</label>
      <Field id={name} type={type} name={name} as={as} autoComplete="off" />
      <S.Error>
        <ErrorMessage name={name} />
      </S.Error>
    </S.Input>
  </>
)

export default Input
