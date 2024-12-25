"use client"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import UserCard from '../components/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UserState } from '../store/types';
import { AnyAction } from '@reduxjs/toolkit';
import { AppState } from '../store/store';
import { useEffect } from 'react';
import { loadUserList } from '../store/actions';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const UserList = () => {
    const router = useRouter()

    const dispatch = useDispatch<ThunkDispatch<UserState, any, AnyAction>>();

    const loading = useSelector(
        (appState: AppState) => appState.userState.loading
    );

    const users = useSelector(
        (appState: AppState) => appState.userState.users
    );

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/sign-in');
            }
            const decodedToken: any = jwtDecode(token ?? "");
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                router.push('/sign-in');
                return;
            }
            dispatch(loadUserList(token ?? ""));
        } catch (error) {
            console.error("Error fetching users:", error);
            router.push('/sign-in');
        }
    }, []);

    return (
        <>
            <h1>User List</h1>

            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}

            {users && <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {users.map((user, index) => {
                        return <UserCard
                            key={index}
                            uid={user.uid}
                            name={user.name}
                            phone_number={user.phone_number}
                            email={user.email}
                            username={user.username} />
                    })}
                </Grid>
            </Box>}
        </>
    )
}

export default UserList