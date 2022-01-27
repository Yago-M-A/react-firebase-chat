import * as Yup from 'yup'

const validateForm = Yup.object({
  name: Yup.string().min(4, 'Too Short').required(),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Email invalid'
    )
    .required(),
  password: Yup.string().min(4, 'Too Short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password not matched')
    .required('Required')
})

export default validateForm
