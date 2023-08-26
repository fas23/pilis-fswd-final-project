import { Box, Button } from '@mui/material'
import CarouselMUI from 'react-material-ui-carousel'
import { MovieContext } from '../context/MovieContext';
import { useContext} from 'react';

function Item (props) {
  return (
    <Box
      component='div'
      sx={{
        backgroundImage: 'url(' + props.item.image.url + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '750px',
        mb: '2rem',
        border: '1px solid transparent',
        borderRadius:'5px',
      }}
    >
      <h2>{props.item.title}</h2>
      <p>{props.item.description}</p>
      <Button>
        Check it out!
      </Button>
    </Box>
  )
}

export const Carousel = () => {
  const { listings} = useContext(MovieContext);
  const items = listings
  console.log(items)
  return (
    <CarouselMUI sx={{ width: '100%', height: '800px'}}>
      {
        items.map((item) => <Item key={item.id} item={item} />)
      }
    </CarouselMUI>
  )
}
