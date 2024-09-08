import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Client, Users, AuthResultStatus} from '../../apiClient';
import { useNavigate } from 'react-router-dom';


export const Register: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate
    const client = new Client("https://localhost:7212"); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let user = new Users();
        user.password = password;
        user.username = username;
        user.email = email;

        try {
            const result = await client.register(user);
            if (result.status === 0) {
                alert(result.message)
                navigate('/login');
            } else{
                alert(result.message)
            }
          } catch (error) {
            console.error(error);
          }
    };

    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
}