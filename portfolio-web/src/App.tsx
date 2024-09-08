import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function App() {
  return (
    
    <AppBar component="nav">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          padding: 1,
        }}
      >
        <Button color="inherit" component={Link} to="/register">Register</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Box>
    </AppBar>
   
  );
}

export default App;
