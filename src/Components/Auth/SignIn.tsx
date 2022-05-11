import { Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Logo from "../../assets/logo-text.png"
import { asyncButtonListner, formValidator, getInputValueWithId } from './AuthUtils';
import { Telegram } from "../../helpers/Telegram"
import GlobalObjects from "../../helpers/Global"
import AuthDialogue from './AuthDialogue';
import { useState, useEffect } from 'react'
import { stateUpdaterInterface } from './interfaces'
import { useNavigate } from 'react-router-dom';
import { getItem } from '../../helpers/StorageHandler';

function SignIn() {


  const RoundTextFiled = styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '10px',
    },
  }));

  const [openAuthDialogue, setOpenAuthDialogue] = useState(true)
  const [authDialogueTitle, setAuthDialogueTitle] = useState('Loading')
  let [currentStates, setcurrentStates] = useState({ phone: false, progress: true, otp: false, password: false })
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

  useEffect(() => {
    getItem('config').then(async (item) => {
      if (item != null && typeof (item) == 'string') {
        item = JSON.parse(item)
        let config: { apiId: number, apiHash: string } = item as { apiId: number, apiHash: string }

        let stringSession: string = (await getItem('token')) as string;
        if (stringSession != null || typeof (stringSession) == 'string') {
          const telegram = new Telegram({ apiHash: config.apiHash, apiId: config.apiId, stringSession: stringSession })
          GlobalObjects.Telegram = telegram;
          signInToTelegram(telegram)
        } else {
          const telegram = new Telegram({ apiHash: config.apiHash, apiId: config.apiId, stringSession: "" })
          GlobalObjects.Telegram = telegram;
          signInToTelegram(telegram)
        }
      } else {
        setOpenAuthDialogue(false)
      }

    })
  }, [])

  function signInToTelegram(telegram: Telegram) {
    setOpenAuthDialogue(true)
    telegram.signIn({
      onInputPhoneNumber: async () => {
        setAuthDialogueTitle('Phone')
        updateCurrentStates({ changedState: "phone", state: true })
        await asyncButtonListner('onNextClicked');
        updateCurrentStates({ changedState: "progress", state: true })

        let phone: string = getInputValueWithId('phone')
        if (phone == null) {
          phone = ''
        }

        return phone;

      },
      onInputPhoneCode: async () => {
        setAuthDialogueTitle('Code')
        updateCurrentStates({ changedState: "otp", state: true })
        await asyncButtonListner('onNextClicked');
        updateCurrentStates({ changedState: "progress", state: true })

        let otp: string = getInputValueWithId('otp')
        if (otp == null) {
          otp = '000000'
        }
        return otp
      },
      onInputPassword: async () => {
        setAuthDialogueTitle('Password')
        updateCurrentStates({ changedState: "password", state: true })
        await asyncButtonListner('onNextClicked');
        updateCurrentStates({ changedState: "progress", state: true })

        let password: string = getInputValueWithId('password')
        if (password == null) {
          password = '22222'
        }

        return password
      },
    }).then((res: any) => {
      setOpenAuthDialogue(false)

      nav('/profile')
    })
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
          signInToTelegram(telegram)

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
        title={authDialogueTitle}
      />
    </Grid>
  )
}

export default SignIn