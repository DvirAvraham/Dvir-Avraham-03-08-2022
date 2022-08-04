import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setLoggedInUser } from '../store/actions/userActions';

const theme = createTheme();

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(null);

  const setUser = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const user = {
      username: data.get('username'),
      password: data.get('password'),
      fullname: data.get('fullname') || '',
    };
    if (user.password !== data.get('repassword') && isSignup) return;
    const success = await dispatch(
      setLoggedInUser({
        user,
        isSignup: isSignup,
      })
    );
    if (success) navigate('/msg');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? 'Sign up' : 'Login '}
          </Typography>
          <Box component="form" onSubmit={setUser} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            {isSignup && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Fullname"
                name="fullname"
                autoComplete="fullname"
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {isSignup && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Verify password"
                type="password"
                id="repassword"
                autoComplete="repassword"
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? 'Sign up' : 'Login '}
            </Button>
            <Grid container>
              <Grid item>
                <div
                  variant="body2"
                  onClick={() => setIsSignup((state) => !state)}
                >
                  {isSignup
                    ? 'Already have an account? Login'
                    : "Don't have an account? Sign Up"}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
