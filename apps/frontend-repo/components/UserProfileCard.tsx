"use client"

import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { UserState } from '../store/types';
import { AnyAction } from '@reduxjs/toolkit';
import { loadUserProfile } from '../store/actions';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const UserProfileCard = () => {
    const router = useRouter()

    const dispatch = useDispatch<ThunkDispatch<UserState, any, AnyAction>>();

    const loading = useSelector(
        (appState: AppState) => appState.userState.loading
    );

    const user = useSelector(
        (appState: AppState) => appState.userState.user
    );

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token === undefined) {
                router.push('/sign-in');
            }
            const decodedToken: any = jwtDecode(token ?? "");
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                router.push('/sign-in');
                return;
            }
            dispatch(loadUserProfile(token ?? ""));
        } catch (error) {
            console.error("Error fetching user profile:", error);
            router.push('/sign-in');
        }
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}

            {user && (<UserCard uid={user.uid}
                name={user.name}
                phone_number={user.phone_number}
                email={user.email ?? ""}
                username={user.username} />)}
        </div>
    )
}

export default UserProfileCard