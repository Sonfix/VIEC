import React, { useState, useRef } from "react";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GoogleButton from 'react-google-button'
import LoadingButton  from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from "react-router-dom"


import { useAuth } from "../../contexts/AuthContext";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="\">
        VIEC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function CheckResp(err, id) {
  return (err === id);
}
const defaultTheme = createTheme();

export default function SignUp(props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  
  const { signup, SignInWithGoogle, currentUser } = useAuth()
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false)

  function handle_switch_to_login(data) {
    props?.onChange(data? data: "LogIn")
  }
  
  async function handleSubmit(e) {
      e.preventDefault()
      const data = new FormData(e.currentTarget);

      if (data.get('email') === ""
      || data.get('password') === ""
      || data.get('password_2') === "") {
        console.log("Fehler", "Bitte fülle alle felder aus!", "error")
        return
      }

      console.log(data.get('password'))
      console.log(data.get('password_2'))
      if (data.get('password') !== data.get('password_2')) {
        console.log("Fehler", "Passwörter stimmen nicht überein", "warning")
        return
      }

      try {
      setLoading(true)
      
      await signup(data.get('email'), data.get('password'))
      navigation("/login", {replace: true})
      // handle_switch_to_login("Text");
      } catch (error){
        var errorCode = error.code;
        if (CheckResp(errorCode, 'auth/weak-password')) {
          console.log("Fehler", 'Das angegebene Passwort ist zu schwach', "warning");
        }
        else if (CheckResp(errorCode, 'auth/email-already-in-use')) {
          console.log("Fehler", 'Die angegebene E-Mail adresse ist bereits vergeben!', "error");
        } else {
          console.log(error);
          console.log("Fehler", "Failed to create an account", "error")
        }
      }

      setLoading(false)
}

async function handle_Google() {
  await SignInWithGoogle();
  
  if (currentUser)
   navigation("/", {replace: true})
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Passwort"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password_2"
                label="Passwort wiederholen"
                type="password"
                id="password_2"
                autoComplete="current-password"
              />
              <Divider />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Erinner mich"
              />
              <Box
                sx={{
                  my: 2,
                  mx: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <GoogleButton
                  onClick={() => { handle_Google() }}
                  sx={{ mt: 3, mb: 2 }}
                />
              </Box>
              {/* <LoadingButton 
                  text="Anmelden" /> */}
              <LoadingButton
                type="submit"
                loading={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrieren
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link onClick={() => navigation("/login", { replace: true })} variant="body2">
                    {"Schon einen Account? Meld dich an!"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}