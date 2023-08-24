import { Box, Button } from '@mui/material'
import CarouselMUI from 'react-material-ui-carousel'

function Item (props) {
  return (
    <Box
      component='div'
      sx={{
        backgroundImage: 'url(' + props.item.image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '750px',
        mb: '2rem',
        border: '1px solid transparent'
      }}
    >
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
      <Button>
        Check it out!
      </Button>
    </Box>
  )
}

export const Carousel = () => {
  const items = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      name: 'Yellow cat',
      description: 'A cute cat'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      name: 'Blue cat',
      description: 'Another cute cat'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1229&q=80',
      name: 'Green cat',
      description: 'A cute cat'
    }
  ]

  return (
    <CarouselMUI sx={{ width: '70%', height: '800px' }}>
      {
        items.map((item) => <Item key={item.id} item={item} />)
      }
    </CarouselMUI>
  )
}
