import { Paper } from '@mui/material'
import { ControlledInput } from './ControlledInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

// const loginSchema = yup.object({
//   email: yup
//     .string()
//     .required()
//     .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Must be a valid address'),
//   password: yup
//     .string()
//     .required()
// }).required()

const loginSchema = yup.object({
  email: yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio')
    .max(255, 'El correo electrónico no debe tener más de 255 caracteres')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'El correo electrónico no es válido'
    ),
  password: yup.string()
    .required('La contraseña es obligatoria')
}).required()

function Login2 () {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <Paper>
      <ControlledInput
        control={control}
        name='email'
        placeholder='Correo electrónico'
        rules={{ required: true }}
      />
    </Paper>
  )
}

export default Login2
