import { PersonRounded } from '@mui/icons-material'
import { Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, Grid, Switch, Typography, Box, Button } from '@mui/material'
import { useEffect } from 'react'
import GlobalObjects from '../../helpers/Global'
function Profile() {

    useEffect(() => {
        if (GlobalObjects.Telegram != null) {
            GlobalObjects.Telegram.getAccountDetails()
        }
    }, [])


    return (
        <div>
            <Grid style={{ textAlign: 'center', marginTop: '30px' }}>
                <PersonRounded style={{ width: '120px', height: '120px', background: '#0088cc', fill: '#ffffff', borderRadius: '50%', padding: '20px' }} />
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }} >Name</Typography>
                <Typography style={{ color: 'grey', marginTop: '-5px' }}>@user_id</Typography>
                <Typography>Some bio about yourself</Typography>


                <div style={{
                    margin:'20px'
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
                                                    defaultChecked
                                                />
                                            )}
                                            label="Save Api id and Api hash"
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