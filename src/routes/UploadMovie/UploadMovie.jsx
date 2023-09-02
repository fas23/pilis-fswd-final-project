import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { useState } from 'react'
import { UploadMovieForm } from '../../components/UploadMovieSteps/UploadMovieForm'
import { UploadImage } from '../../components/UploadMovieSteps/UploadImage'
import { FinalChoice } from '../../components/UploadMovieSteps/FinalChoice'

const steps = ['Sube la imagen', 'Carga su información', '¿Qué hacer a continuación?']

export const UploadMovie = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [imageId, setImageId] = useState(undefined)

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
    1: <UploadMovieForm handleNext={handleNext} imageId={imageId} />,
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
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
      {stepsComponents[activeStep]}
    </>
  )
}
