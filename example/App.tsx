import { GoogleButton, GithubButton, AuthProvider, useAuthData } from '../src/'
import { ThemeProvider, Box } from '@chakra-ui/core'
import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'

const App = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
    return (
        <ThemeProvider>
            <Box alignContent='center' alignItems='center'>
                <AuthProvider
                    noPersistence
                    onLogin={async (user, creds) => {
                        console.log('onLogin 1')
                        console.log(creds.toJSON())
                    }}
                    onError={(e) => alert(e.message)}
                >
                    <AuthProvider
                        noPersistence
                        onLogin={async (user, creds) => {
                            console.log('onLogin 2')
                            console.log(creds.toJSON())
                        }}
                        onError={(e) => alert(e.message)}
                    >
                        <GoogleButton
                            text='Start With Google'
                            // scopes={['https://www.googleapis.com/auth/cloud-platform']}
                        />
                        <GithubButton text='Start With Github' />
                        <DisplayUser />
                    </AuthProvider>
                </AuthProvider>
            </Box>
        </ThemeProvider>
    )
}

const DisplayUser = () => {
    const { user = {}, loading } = useAuthData()
    if (loading) {
        return <>loading...</>
    }
    return (
        <Box maxWidth='800px' overflowX='scroll'>
            <pre>{JSON.stringify(user, null, 4)}</pre>
        </Box>
    )
}

const firebaseConfig = {
    apiKey: 'AIzaSyD0ll629FiyH5SJ903ZeDdYpahfGPOqzxQ',
    authDomain: 'molten-enigma-261612.firebaseapp.com',
    databaseURL: 'https://molten-enigma-261612.firebaseio.com',
    projectId: 'molten-enigma-261612',
    storageBucket: 'molten-enigma-261612.appspot.com',
    messagingSenderId: '794182721870',
    appId: '1:794182721870:web:945e67c12addaa0cd43e1f',
    measurementId: 'G-YL40MBMZ0L',
}

export default App
// render(<App />, document.getElementById('root'))
