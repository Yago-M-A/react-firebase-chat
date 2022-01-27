import * as Yup from 'yup'

const validateForm = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Email invalid'
    )
    .required('Required'),
  password: Yup.string().min(4, 'Too Short').required('Required')
})

export default validateForm
