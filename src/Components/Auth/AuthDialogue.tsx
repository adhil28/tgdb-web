import { Dialog, DialogTitle, TextField, DialogContent, Button, DialogContentText, DialogActions, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { getInputValueWithId } from './AuthUtils'
import { AuthEvents, stateUpdaterInterface } from './interfaces'

interface Options {
    open: boolean, setOpen: (open: boolean) => any, currentStates: { phone: boolean, progress: boolean, otp: boolean, password: boolean }
}
function AuthDialogue({ open, setOpen, currentStates }: Options) {

    const AuthInputs = {
        phone: () => {
            return (
                <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="Enter your phone number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: '5px' }} />
            )
        }, progress: () => {
            return (
                <CircularProgress />
            )
        },
        otp: () => {
            return (
                <TextField
                    autoFocus
                    margin="dense"
                    id="otp"
                    label="Enter the code send by Telegram"
                    type="text"
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: '5px' }} />
            )
        },
        password: () => {
            return (
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Enter your telegram password"
                    type="text"
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: '5px' }} />
            )
        }
    }

    return (
        <Dialog key={"Ad"} open={open} >
            <DialogContent style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Box textAlign='center'>
                    <DialogTitle style={{ marginBottom: '0' }}>Phone number</DialogTitle>
                    {
                        currentStates.phone ? <AuthInputs.phone />
                            : currentStates.otp ? <AuthInputs.otp />
                                : currentStates.password ? <AuthInputs.password />
                                    : <AuthInputs.progress />
                    }
                    < Button id='onNextClicked'  fullWidth variant='contained' style={{ padding: '10px', marginTop: '5px' }}>Next</Button>
                </Box>
            </DialogContent>
        </Dialog >
    )
}

export default AuthDialogue