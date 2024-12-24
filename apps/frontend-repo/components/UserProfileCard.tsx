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

const UserProfileCard = () => {
    const router = useRouter()

    const dispatch = useDispatch<ThunkDispatch<UserState, any, AnyAction>>();

    const loading = useSelector(
        (appState: AppState) => appState.userState.loading
    );

    const user = useSelector(
        (appState: AppState) => appState.userState.user
    );

    const error = useSelector(
        (appState: AppState) => appState.userState.error
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/sign-in');
        }
        dispatch(loadUserProfile(token ?? ""));
        if (error) {
            console.error("Error fetching users:", error);
            router.push('/sign-in'); // Redirect to sign-in page if error occurs.
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

            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span> {error}
                            </p>
                        </section>
                    </div>
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