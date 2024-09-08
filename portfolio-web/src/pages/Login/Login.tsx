
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { Client} from '../../apiClient';
import { useNavigate } from 'react-router-dom';
import { url } from '../Common/Common';

export const Login: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
    const client = new Client(url); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const result = await client.login(username, password);
            if (result.status === 0) {
                alert(result.message)
                navigate('/profile');
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
              Login
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
}