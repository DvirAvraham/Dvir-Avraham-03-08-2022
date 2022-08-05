import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';

const theme = createTheme();

const EditUser = ({ user, saveUser }) => {
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleSetUser = (ev) => {
    ev.preventDefault();
    let userToSave;
    if (user?._id) {
      userToSave = JSON.parse(JSON.stringify(user));
      userToSave = {
        username,
        ...userToSave,
        fullname,
        imgUrl: userToSave.imgUrl,
      };
    } else {
      userToSave = {
        username,
        password,
        repassword,
        fullname,
      };
    }
    console.log(userToSave);
    saveUser(userToSave);
  };

  return (
    <div className="edit-user">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <div className="edit-form-title flex justify-center">
            {!user?._id ? 'Create user' : `Edit ${user.fullname}`}
          </div>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="form"
              onSubmit={handleSetUser}
              noValidate
              sx={{ mt: 1 }}
            >
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Fullname"
                name="fullname"
                autoComplete="fullname"
              />
              {!user?._id && (
                <>
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
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {!user?._id ? 'Create' : `Update`}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* <form className="flex column" action="" onSubmit={handleSetUser}>
        <input
          type="text"
          value={fullname}
          onChange={(ev) => {
            setFullname(ev.target.value);
          }}
        />
        <input
          type="text"
          value={username}
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
        />
        {!user?._id && (
          <>
            <input
              type="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            <input
              type="password"
              value={repassword}
              onChange={(ev) => {
                setRepassword(ev.target.value);
              }}
            />
          </>
        )}
        <button>Save</button>
      </form> */}
    </div>
  );
};

export default EditUser;
