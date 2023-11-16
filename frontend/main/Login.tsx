import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Login() {
    const [email, setEmail] = useState('')

    const handleEmailChange = (e) => {
        console.log('hi')
        setEmail(e.target.value)
       }

    return (
    <Stack style={{width:'300px', padding: '20px'}} spacing={2}>
        <TextField label="Email" variant="outlined" onChange={handleEmailChange}/>
        <TextField label="Password" variant="outlined" />
    <Button variant="outlined">Login</Button>
    </Stack>
    )
}