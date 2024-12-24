"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import UserList from '../components/UserList';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import UserProfileCard from '../components/UserProfileCard';
import { CustomContainer } from '../components/CustomContainer';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const router = useRouter()

    const [fetchUserProfile, setFetchUserProfile] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            router.push('/sign-in');
        }
        try {
            const decodedToken: any = jwtDecode(token ?? "");
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                router.push('/sign-in');
            }
        } catch (error) {
            localStorage.removeItem('token');
            router.push('/sign-in');
        }
    }, [router])

    return (
        <Provider store={store}>
            <CustomContainer sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                <h1>Welcome To Home Page</h1>
                <Box display="flex" >
                    <Button variant="contained"
                        sx={{ background: 'white', color: 'black', paddingY: '10px', marginRight: '10px' }} onClick={() => {
                            setFetchUserProfile(true);
                        }}>
                        Fetch Current Profile
                    </Button>
                    <Button variant="contained"
                        sx={{ background: 'white', color: 'black', paddingY: '10px', marginRight: '10px' }} onClick={() => {
                            router.push('/update-user');
                        }}>
                        Update Profile
                    </Button>
                    <Button variant="contained"
                        sx={{ background: 'red', color: 'white', paddingY: '10px' }} onClick={() => {
                            localStorage.removeItem('token');
                            router.push('/sign-in');
                        }}>
                        Log Out
                    </Button>
                </Box>
                {fetchUserProfile && <UserProfileCard />}
                <UserList />
            </CustomContainer>
        </Provider>
    )
}

export default Home