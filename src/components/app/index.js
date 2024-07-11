import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { useNavigate  } from "react-router-dom"
import Toolbar from '@mui/material/Toolbar';


import ClippedDrawer from "./components/drawer"
import GenerationPage from './components/generation_page';
import { useDocContext } from '../../contexts/DocumentContext'

export default function DescriptionMaker() {
  
  const [mode, setMode] = React.useState('display');
  const [currentDesc, setCurrentDesc] = React.useState(null);

  const { createDescription } = useDocContext();

  let navigation = useNavigate ();

  function onDrawerSelectedItem(item) {
    setMode(item);
    if (item === "new") {
      createDescription();
    }
  }

  return (
    <>
      <CssBaseline />
        
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <img
            src={'logo.png'}
            alt={'VIEC'}
            loading="lazy"
            style={{
              resizeMode: 'contain',
              height: 50,
              width: 50,
              paddingRight: 10,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigation("/", {replace: true})}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VIEC
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <ClippedDrawer onItemSelect={onDrawerSelectedItem} />  
        <Container fixed>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {mode === "new" && <GenerationPage />}
            
          </Box>
        </Container>
      </Container>
    </>
  );
}