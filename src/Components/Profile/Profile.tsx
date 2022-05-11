import { PersonRounded } from '@mui/icons-material'
import { Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, Grid, Switch, Typography, Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import GlobalObjects from '../../helpers/Global'
import { getCheckBoxState } from './Utils'
import "../../helpers/StorageHandler"
import { getItem, save } from '../../helpers/StorageHandler'
import { useNavigate } from 'react-router-dom'
function Profile() {

    const [accountDetails, setAccountDetails] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        photo: ''
    })
    const [configFound, setconfigFound] = useState(false)

    const nav = useNavigate()

    useEffect(() => {
        if (GlobalObjects.Telegram != null) {
            GlobalObjects.Telegram.getAccountDetails().then((me) => {
                me = JSON.parse(JSON.stringify(me));
                let { firstName, lastName, phone, photo, username } = me as { firstName: string, lastName: string, phone: string, photo: any, username: string }
                setAccountDetails({ firstName, lastName, phone, photo, username })
            })
        } else {
            nav('/sign-in')
        }
        getItem('config').then((item) => {
            if (item != null) {
                setconfigFound(true)
            }
        })
    }, [])


    return (
        <div>
            <Grid style={{ textAlign: 'center', marginTop: '30px' }}>
                <PersonRounded style={{ width: '120px', height: '120px', background: '#0088cc', fill: '#ffffff', borderRadius: '50%', padding: '20px' }} />
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }} >{accountDetails.firstName + ' ' + accountDetails.lastName}</Typography>
                <Typography style={{ color: 'grey', marginTop: '-5px' }}>@{accountDetails.username}</Typography>
                <Typography>+{accountDetails.phone}</Typography>


                <div style={{
                    margin: '20px'
                }}>
                    <form >
                        <Card>
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={6}
                                    wrap="wrap"
                                >
                                    <Grid
                                        item
                                        md={4}
                                        sm={6}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        xs={12}
                                    >

                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    color="primary"
                                                    checked={configFound ? true : false}
                                                />
                                            )}
                                            label="Save Api id and Api hash"
                                            onClick={(e) => {
                                                if (getCheckBoxState(e.target)) {
                                                    if (GlobalObjects.Telegram != null) {
                                                        save('config', JSON.stringify(GlobalObjects.Telegram.getApiIdAndHash()))
                                                    } else {
                                                        nav('/sign-in')
                                                    }
                                                } else {
                                                    localStorage.removeItem('config')
                                                }
                                                setconfigFound(getCheckBoxState(e.target))
                                            }}
                                        />
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    color="primary"
                                                    defaultChecked
                                                />
                                            )}
                                            label="Save String session"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Live database updates"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </div>
            </Grid>
        </div>
    )
}

export default Profile