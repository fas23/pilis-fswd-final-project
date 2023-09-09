import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useController } from 'react-hook-form'

export const ControlledSelect = (props) => {
  const { name, label, control, options, ...restOfProps } = props

  const {
    field: { value, onBlur, onChange },
    fieldState: { invalid, error }
  } = useController({
    name,
    control,
    rules: { required: true }
  })

  return (
    <FormControl
      fullWidth
      error={Boolean(error)}
      {...restOfProps}
    >
      <InputLabel id={`${name}-simple-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-simple-select-label`}
        id={`${name}-simple-select`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
          >{item.label}
          </MenuItem>
        ))}

      </Select>
      <FormHelperText>{invalid && error?.message}</FormHelperText>
    </FormControl>
  )
}
