"use client"

import { z } from "zod";

import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { CustomContainer } from "../../components/CustomContainer";
import { RegisterSchema } from "shared-utils";
import { updateUser } from "../apis/userApi";
import { CustomCard } from "../../components/CustomCard";

const UpdateUserForm = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (errors.username || errors.name || errors.phone_number) return;
            const formData = new FormData(event.currentTarget);
            const payload = JSON.stringify({
                username: formData.get("username"),
                name: formData.get("name"),
                phone_number: formData.get("phone_number"),
            });
            const token = localStorage.getItem("token");
            const response = await updateUser(token ?? "", payload);
            if (response.status === 401) {
                router.push('/sign-in');
                return;
            }
            router.push('/');
        } catch (error) {
            console.log(error)
            setErrors({ register: 'Login failed. Please check your credentials.' });
        }
    };

    const validateInputs = async () => {
        try {
            const name = document.getElementById('name') as HTMLInputElement;
            const username = document.getElementById('username') as HTMLInputElement;
            const phone_number = document.getElementById('phone_number') as HTMLInputElement;
            const formValues = {
                name: name.value,
                username: username.value,
                phone_number: phone_number.value,
            };
            await RegisterSchema.parseAsync(formValues);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;
                setErrors(fieldErorrs as unknown as Record<string, string>);
            }
        }
    }

    return (
        <CustomContainer direction="column" justifyContent="space-between">
            <CustomCard variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Update User
                </Typography>
                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <FormControl>
                        <FormLabel htmlFor="name" sx={{ marginBottom: '10px' }}>Name</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            placeholder="John"
                            name="name"
                            autoComplete="name"
                            variant="outlined"
                            error={errors.name !== undefined}
                            helperText={errors.name}
                            color={errors.name ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="username" sx={{ marginBottom: '10px' }}>Username</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            placeholder="John99"
                            name="username"
                            autoComplete="username"
                            variant="outlined"
                            error={errors.username !== undefined}
                            helperText={errors.username}
                            color={errors.username ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="phone_number" sx={{ marginBottom: '10px' }}>Phone Number</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="phone_number"
                            placeholder="0812xxxxxxx"
                            name="phone_number"
                            autoComplete="phone_number"
                            variant="outlined"
                            error={errors.phone_number !== undefined}
                            helperText={errors.phone_number}
                            color={errors.phone_number ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ background: 'white', color: 'black', paddingTop: '10px', marginBottom: '10px' }}
                        onClick={validateInputs}
                    >
                        Update
                    </Button>
                    {errors.register && <Typography color="error">{errors.register}</Typography>}
                </Box>
            </CustomCard>
        </CustomContainer>
    )
}

export default UpdateUserForm