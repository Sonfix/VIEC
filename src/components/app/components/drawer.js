import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FeedbackIcon from '@mui/icons-material/Feedback';

const drawerWidth = 240;

let main_items = [
    {
        caption: "Neue Beschreibung",
        icon: <AddBoxIcon />,
        action: "new",
    },
    {
        caption: "Favoriten",
        icon: <StarBorderPurple500Icon />,
        action: "fav",
    },
    
    {
        caption: "Papierkorb",
        icon: <RecyclingIcon />,
        action: "bin",
    }
]

let sub_items = [
    {
        caption: "Feedback",
        icon: <FeedbackIcon />,
        action: "feedback",
    },
]



export default function ClippedDrawer() {

    function onItemClick(action) {
        if (action == null) return;
        console.log(action)
        if (action === "new") {

        }
        else if (action === "fav") {

        }
        else if (action === "bin") {

        }
        else if (action === "feedback") {

        }
    }

  return (
    <Box sx={{ display: 'flex' }}>
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
            href="#app-bar-with-responsive-menu"
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {main_items.map((item) => (
              <ListItem key={item.caption} disablePadding>
                <ListItemButton onClick={() => onItemClick(item.action)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.caption} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {sub_items.map((item) => (
              <ListItem key={item.caption} disablePadding>
                <ListItemButton onClick={() => onItemClick(item.action)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.caption} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}