/* eslint-disable react/jsx-handler-names */
import { TextField } from '@mui/material'
// import { useField } from 'formik'
import { useController } from 'react-hook-form'

export const ControlledInput = (props) => {
  const { name } = props

  // const [field, meta] = useField(name)
  // const { control, name, children, ...restOfProps } = props
  const { field, fieldState } = useController(props)
  console.log(field, fieldState)

  return (
    <TextField
      {...field}
      id={name}
      label={name}
      variant='outlined'
      fullWidth
      // error={fieldState.invalid}
      // value={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      helperText={fieldState.error?.message}
    />
  )
}
