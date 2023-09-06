import { Box, Divider, Grid, Card, CardContent, CardActions, Typography, Skeleton } from '@mui/material'
import { Stack } from '@mui/joy'

const SkeletonListing = ({ count = 4 }) => {
  return (
    Array(count).fill(0).map((_, i) =>
      <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
        <Card variant='outlined'>
          <Skeleton
            variant='rectangular' sx={{
              width: '100%',
              height: '320px',
              objectFit: 'cover',
              objectPosition: 'center',
              bgcolor: 'grey.600'
            }}
          />
          <CardContent orientation='horizontal' sx={{ padding: '1rem' }}>
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Typography level='title-lg' sx={{ fontSize: '1rem', fontWeight: 'bold' }} />
              <Skeleton sx={{ bgcolor: 'grey.600' }} width='100%' />
              <Typography level='body-xs'><Skeleton sx={{ bgcolor: 'grey.600' }} width={60} /></Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Typography level='body-lg'><Skeleton variant='circular' width={40} height={40} sx={{ bgcolor: 'grey.600' }} /></Typography>
              </Box>

              <Divider />

              <Typography level='body-xs'><Skeleton sx={{ bgcolor: 'grey.600' }} width={40} /></Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>

                <Typography level='body-lg'><Skeleton variant='circular' width={40} height={40} sx={{ bgcolor: 'grey.600' }} /></Typography>
              </Box>

            </Stack>
          </CardContent>
          <CardActions sx={{ padding: 0 }}>

            {/* <Button
            variant='contained' sx={{ width: '100%', borderRadius: 0 }}
          > */}
            <Skeleton sx={{ width: '100%', borderRadius: 0, bgcolor: 'grey.600' }} height={50} />
            {/* </Button> */}
            {/* </Link> */}
          </CardActions>
        </Card>
      </Grid>)

  )
}

export default SkeletonListing
