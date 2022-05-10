import { Telegram } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const nav = useNavigate()
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3} style={{ textAlign: "center", maxWidth: '70%' }}>
        <img src={"https://avatars.githubusercontent.com/u/101850013?s=200&v=4"} style={{ width: '220px', height: '220px', borderRadius: '50%' }} alt="logo"  />
        <Typography sx={{ fontSize: '35px', fontWeight: 'bold' }}>Telegram Database</Typography>
        <Typography style={{ color: 'grey' }}>Make Telegram Channels your next Database </Typography>
      
        <Button onClick={() => {
          nav('/sign-in')
        }} style={{ borderRadius: '14px', padding: '10px' }} fullWidth variant="contained">Sign In</Button>
      </Grid>
    </Grid>
  )
}

export default Home