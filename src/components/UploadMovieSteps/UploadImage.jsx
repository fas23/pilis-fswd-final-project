/* eslint-disable import/no-absolute-path */
import { Box, Container, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { uploadImage } from '../../services/uploadImage'
import ImageUploader from '/src/assets/img/image.svg'
import { ColorButton } from '../ColorButton'

export const UploadImage = (props) => {
  const { handleNext, handleImage } = props

  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const upload = (file) => {
    const formData = new FormData()

    if (file !== undefined) {
      formData.append('image', file)
      setIsLoading(true)

      uploadImage(formData,
        (progressEvent) => {
          const { loaded, total } = progressEvent

          if (total !== undefined) {
            const percent = Math.round((loaded * 100) / total)
            setProgress(percent)
          }
        })
        .then(({ data }) => {
          const { response: { id } } = data
          handleImage(id)
          handleNext()
        }).catch((error) => {
          console.log({ error })
        }).finally(() => {
          setProgress(0)
          setIsLoading(false)
        })
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = Array.from(e.dataTransfer.files)[0]
    upload(file)
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    upload(file)
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: '2rem'
      }}
    >

      {!isLoading
        ? (

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
          >
            <Typography
              variant='h4'
              textAlign='center'
              component='h1'
              mb='1.5rem'
              fontWeight='bold'
            >Sube la imagen
            </Typography>
            <Paper
              component='form'
              elevation={3}
              sx={{
                p: '2rem',
                width: '80%',
                borderRadius: '.5rem'
              }}
            >

              <Typography
                variant='body1'
                textAlign='center'
                component='p'
                fontWeight={300}
                mb='1.5rem'
                color='#828282'
              >El archivio debe ser Jpeg, Jpg o Png
              </Typography>

              <Stack
                spacing={4}
                component='div'
                sx={{
                  border: '2px dashed #97BEF4',
                  p: '2rem',
                  borderRadius: '.5rem',
                  backgroundColor: '#F6F8FB',
                  mb: '1rem'
                }}
                draggable
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Box
                    component='img'
                    src={ImageUploader}
                    alt='image uploader.'
                    sx={{
                      display: 'block',
                      width: '150px'
                    }}
                  />
                </Box>

                <Typography
                  variant='body1'
                  textAlign='center'
                  component='p'
                  fontWeight={300}
                  mb='1rem'
                  color='#BDBDBD'
                >Arrastra y suelta tu imagen aquí
                </Typography>

              </Stack>

              <Typography
                variant='body1'
                textAlign='center'
                component='p'
                fontWeight={300}
                mb='1rem'
                color='#BDBDBD'
              >O
              </Typography>

              <ColorButton
                variant='contained'
                component='label'
                sx={{
                  display: 'block',
                  width: '50%',
                  marginX: 'auto',
                  textAlign: 'center',
                  borderRadius: '.5rem',
                  textTransform: 'initial',
                  fontSize: '1rem'
                }}
              >
                Elige un archivo
                <input
                  type='file'
                  hidden
                  onChange={(e) => handleChange(e)}
                />
              </ColorButton>

            </Paper>
          </Box>
          )

        : (
          <Paper
            elevation={3}
            sx={{
              p: '1.5rem',
              width: '80%',
              borderRadius: '.5rem'
            }}
          >
            <Typography
              mb='1rem'
            >
              Subiendo imagen...
            </Typography>
            <LinearProgress variant='determinate' value={progress} />
          </Paper>
          )}

    </Container>
  )
}
