import { Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Logo from "../../assets/logo-text.png"
import { asyncButtonListner, formValidator, getInputValueWithId } from './AuthUtils';
import { Telegram } from "../../helpers/Telegram"
import GlobalObjects from "../../helpers/Global"
import AuthDialogue from './AuthDialogue';
import { useState } from 'react'
import { stateUpdaterInterface } from './interfaces'
import { useNavigate } from 'react-router-dom';

function SignIn() {


  const RoundTextFiled = styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '10px',
    },
  }));

  const [openAuthDialogue, setOpenAuthDialogue] = useState(false)
  let [currentStates, setcurrentStates] = useState({ phone: false, progress: true, otp: false, password: false })
  const [onNextClicked, setonNextClicked] = useState('')
  const updateCurrentStates = ({ changedState, state }: stateUpdaterInterface) => {
    switch (changedState) {
      case 'phone':
        setcurrentStates({
          otp: false,
          password: false,
          phone: true,
          progress: false
        })
        break;
      case 'otp':
        setcurrentStates({
          otp: true,
          password: false,
          phone: false,
          progress: false
        })
        break;
      case 'password':
        setcurrentStates({
          otp: false,
          password: true,
          phone: false,
          progress: false
        })
        break;
      case 'progress':
        setcurrentStates({
          otp: false,
          password: false,
          phone: false,
          progress: true
        })
        break;
      default:
        break;
    }

  }
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
        <img style={{ width: '250px' }} src={Logo} alt="Logo" />
        <br />
        <form onSubmit={(e) => {
          e.preventDefault()
          let data: { "app-id": string, "api-hash": string, "channel-id": string } = formValidator(e.currentTarget) as { "app-id": string, "api-hash": string, "channel-id": string }
          const telegram = new Telegram({ apiHash: data['api-hash'], apiId: parseInt(data['app-id']), stringSession: localStorage.getItem('token') })
          GlobalObjects.Telegram = telegram;
          setOpenAuthDialogue(true)
          telegram.signIn({
            onInputPhoneNumber: async () => {
              updateCurrentStates({ changedState: "phone", state: true })
              await asyncButtonListner('onNextClicked');

              let phone: string = getInputValueWithId('phone')
              if (phone == null) {
                phone = ''
              }
              return phone;
              /*  */

            },
            onInputPhoneCode: async () => {
              updateCurrentStates({ changedState: "otp", state: true })
              await asyncButtonListner('onNextClicked');

              let otp: string = getInputValueWithId('otp')
              if (otp == null) {
                otp = '000000'
              }
              return otp
            },
            onInputPassword: async () => {
              updateCurrentStates({ changedState: "password", state: true })
              await asyncButtonListner('onNextClicked');
              let password: string = getInputValueWithId('password')
              if (password == null) {
                password = '22222'
              }
              return password
            },
          }).then((val) => {
            setOpenAuthDialogue(false)

            nav('/profile')
          })

        }}>
          <Typography style={{ fontSize: '35px', fontWeight: 'bold' }}>Sign in to TGDB</Typography>
          <Typography style={{ fontSize: '18px', color: 'grey' }}>Enter the credntials below to login</Typography>
          <RoundTextFiled name='app-id' style={{ marginTop: '10px', borderRadius: '20px' }} label="App id" fullWidth required />
          <RoundTextFiled name='api-hash' style={{ marginTop: '5px' }} label="Api hash" fullWidth required />
          <RoundTextFiled name='channel-id' style={{ marginTop: '5px' }} label="Channel id" fullWidth required />
          <Button type='submit' variant="contained" fullWidth style={{ padding: '10px', marginTop: '5px', borderRadius: '10px' }}>Login</Button>
        </form>
      </Grid>
      <AuthDialogue
        open={openAuthDialogue}
        setOpen={setOpenAuthDialogue}
        currentStates={currentStates}
      />
    </Grid>
  )
}

export default SignIn