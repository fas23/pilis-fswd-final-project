import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UploadMovieForm } from '../../components/UploadMovieSteps/UploadMovieForm'
import { UploadImage } from '../../components/UploadMovieSteps/UploadImage'
import { FinalChoice } from '../../components/UploadMovieSteps/FinalChoice'

const stepsToUploadNewMovie = ['Sube la imagen', 'Carga su información', '¿Qué hacer a continuación?']
const stepsToUpdateMovie = ['Sube la imagen a actualizar', 'Actualiza su información', '¿Qué hacer a continuación?']

export const UploadMovie = () => {
  const location = useLocation()

  const [activeStep, setActiveStep] = useState(0)
  const [imageId, setImageId] = useState(location.state !== null ? location.state.movie.id : undefined)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleReset = () => {
    setImageId(undefined)
    setActiveStep(0)
  }

  const handleImage = (id) => setImageId(id)

  const stepsComponents = {
    0: <UploadImage handleNext={handleNext} handleImage={handleImage} />,
    1: <UploadMovieForm handleNext={handleNext} imageId={imageId} movie={location.state !== null ? location.state.movie : undefined} />,
    2: <FinalChoice handleReset={handleReset} />
  }

  return (
    <>
      <Box sx={{
        width: '80%',
        mx: 'auto'
      }}
      >
        <Stepper activeStep={activeStep}>
          {
            location.state !== null
              ? stepsToUpdateMovie.map((label, index) => {
                const stepProps = {}
                const labelProps = {}

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })
              : stepsToUploadNewMovie.map((label, index) => {
                const stepProps = {}
                const labelProps = {}

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })
        }
        </Stepper>
      </Box>
      {stepsComponents[activeStep]}

      {
        location.state !== null && activeStep === 0 &&
          <Button
            variant='text'
            sx={{ textTransform: 'initial', fontSize: '1rem', display: 'block', mx: 'auto' }}
            onClick={handleNext}
          >Saltar paso
          </Button>
      }

    </>
  )
}
