import React from 'react';
import { Paper, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <StyledTextField
              label="Username"
              variant="outlined"
              type="text"
              required
            />
            <StyledTextField
              label="Password"
              variant="outlined"
              type="password"
              required
            />
            <Link to="/home">
            <StyledButton variant="contained" color="primary" type="submit">
            
              Sign In
            </StyledButton>
           </Link>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
};

export default Login;
