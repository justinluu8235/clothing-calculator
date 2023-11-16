import React from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Login() {
    return (
    <Stack style={{width:'300px', padding: '20px'}} spacing={2}>
    <TextField label="Email" variant="outlined"></TextField>
    <TextField label="Password" variant="outlined"></TextField>
    <Button variant="outlined">Login</Button>
    </Stack>
    )
}