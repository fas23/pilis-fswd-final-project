import { Skeleton } from '@mui/material'
import CarouselMUI from 'react-material-ui-carousel'

const SkeletonCarrousel = () => {
  return (
    <CarouselMUI>
      <Skeleton variant='rectangular' sx={{ width: '100%', height: '800px', bgcolor: 'grey.900' }} />
    </CarouselMUI>
  )
}

export default SkeletonCarrousel
