"use client"

import * as z from "zod";
import Link from '@mui/material/Link';
import { signInApi } from "../apis/authApi";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CustomContainer } from "../../components/CustomContainer";
import { CustomCard } from "../../components/CustomCard";
import { LoginSchema } from "shared-utils";

export default function SignIn() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (errors.email || errors.password) return;
      const formData = new FormData(event.currentTarget);
      const payload = JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      })
      const response = await signInApi(payload);
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error) {
      console.log(error)
      setErrors({ login: 'Login failed. Please check your credentials.' });
    }
  };

  const validateInputs = async () => {
    try {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      const formValues = {
        email: email.value,
        password: password.value,
      };
      await LoginSchema.parseAsync(formValues);
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
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          noValidate
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel htmlFor="email" sx={{ marginBottom: '10px' }}>Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={errors.email !== undefined}
              helperText={errors.email}
              color={errors.email ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ marginBottom: '10px' }}>Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="password"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={errors.password !== undefined}
              helperText={errors.password}
              color={errors.password ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ background: 'white', color: 'black', paddingTop: '10px' }}
            onClick={validateInputs}
          >
            Login
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </Typography>
          {errors.login && <Typography color="error">{errors.login}</Typography>}
        </Box>
      </CustomCard>
    </CustomContainer>
  );
}