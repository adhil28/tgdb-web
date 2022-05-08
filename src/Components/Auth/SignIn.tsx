import { Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Logo from "../../assets/logo-text.png"

function signIn() {

  const RoundTextFiled= styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '10px',
    },
  }));
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3} style={{ textAlign: "center", maxWidth: '30%' }}>
        <img style={{ width: '250px' }} src={Logo} alt="Logo"/>
        <br />
        <form >
          <Typography style={{ fontSize: '35px', fontWeight: 'bold' }}>Sign in to TGDB</Typography>
          <Typography style={{ fontSize: '18px', color: 'grey' }}>Enter the credntials below to login</Typography>
          <RoundTextFiled style={{ marginTop: '10px',borderRadius:'20px' }} label="App id" fullWidth required />
          <RoundTextFiled style={{ marginTop: '5px' }} label="Api hash" fullWidth required />
          <RoundTextFiled style={{ marginTop: '5px' }} label="Channel id" fullWidth required />
          <Button type='submit' variant="contained" fullWidth style={{ padding: '10px', marginTop: '5px',borderRadius:'10px' }}>Login</Button>
        </form>
      </Grid>

    </Grid>
  )
}

export default signIn