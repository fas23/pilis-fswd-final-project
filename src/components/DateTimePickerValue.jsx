import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useController } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'
import dayjs from 'dayjs'

export const DateTimePickerValue = (props) => {
  const { name, label, control, ...restOfProps } = props

  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: true }
  })

  return (
    <FormControl
      fullWidth
      error={Boolean(error)}
      sx={{ mb: '1rem' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          disablePast
          value={dayjs(value)}
          format='DD/MM/YYYY HH:mm'
          onChange={onChange}
          label={label}
          slotProps={{
            textField: {
              helperText: `${!error ? 'DD / MM / YYYY HH:mm' : ''}`
            }
          }}
          sx={{
            width: '100%',
            borderRadius: '.3rem',
            border: `${error && '1px solid red'}`
          }}
          {...restOfProps}
        />
      </LocalizationProvider>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}
