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

export default function LogIn() {

  const [default_loading, setdefault_Loading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, SignInWithGoogle, currentUser} = useAuth();

  let navigation = useNavigate ();

  async function handle_Google() {
    await SignInWithGoogle();
    
    if (currentUser)
     navigation("/", {replace: true})
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      if (data.get('email') === "" || data.get('password') === "") {
        // showToast("Fehler", "E-Mail Adresse und Passwort müssen eingetragen werden!", "error");
        return
      }

      setdefault_Loading(true);
      await login(data.get('email'), data.get('password'));      
      
      navigation("/", {replace: true})
    } catch (error){
      if (CheckResp(error, "auth/invalid-email")){
        // showToast("Fehler", "E-Mail nicht gefunden!", "error");
      }
      else if (CheckResp(error, "auth/user-disabled")) {
        // showToast("Fehler", "Der angegebene Account wurde deaktiviert! Bitte wenden Sie sich an den System admin", "error");
      }
      else if (CheckResp(error, "auth/user-not-found")){
        // showToast("Fehler", "Es konnte kein Nutzer mit der E-Mail Adresse gefunden werden! Haben Sie sich vertippt oder gar keinen Account?", "error");
      }
      else if (CheckResp(error, "auth/wrong-password")){
        // showToast("Fehler", "Das Passwort stimmt nicht!", "error");
      }
      else{
        // showToast("Fehler", "Es gab einen unvorhergesehenen Fehler!", "error");
        console.log(error);
      }
    }
    // setdefault_Loading(false);
  };

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
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Divider />
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
                loading={default_loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Anmelden
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={() => navigation("/signup", { replace: true })} variant="body2">
                    {"Don't have an account? Sign Up"}
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