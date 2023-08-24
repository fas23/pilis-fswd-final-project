/* eslint-disable react/jsx-handler-names */
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

export const ControlledInput = (props) => {
  const { name, label, control, ...restOfProps } = props

  const {
    field: { value, onBlur, onChange },
    fieldState: { invalid, error }
  } = useController({
    name,
    control,
    rules: { required: true }
  })

  return (
    <TextField
      id={name}
      label={label}
      variant='outlined'
      fullWidth
      error={invalid}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={invalid && error?.message}
      {...restOfProps}
    />
  )
}
