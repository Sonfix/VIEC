import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import ClippedDrawer from "./components/drawer"

export default function DescriptionMaker() {
  return (
    <>
        <CssBaseline />
        <ClippedDrawer />  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        </Box>
    </>
  );
}