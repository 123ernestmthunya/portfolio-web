import React, { useState } from 'react'; 
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    marginTop: "10rem"
  }));

export const Profile: React.FC = () => {
    return (
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={8}>
                <Item>
                    <Avatar alt="My image" src="/me.jpeg" sx={{ width: 1000, height: 1000 }} />
                </Item>
            </Grid>
            <Grid size={2}>
            <Typography variant="h5" gutterBottom sx={{marginTop: "10rem"}}>
                            Ernest Bonginkosi Mthunya
            </Typography>
            </Grid>
            <Grid size={2}>
            <Typography variant="h5" gutterBottom sx={{marginTop: "10rem"}}>
                            Bsc Computer Sciene & Informatics
            </Typography>
            </Grid>
        </Grid>
      );
    
}