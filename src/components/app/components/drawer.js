import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

let main_items = [
    {
        caption: "Dashboard",
        icon: <DashboardIcon />,
        action: "dash",
    },
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



export default function ClippedDrawer(props) {

    function onItemClick(action) {
        if (action == null) return;
        
        props?.onItemSelect(action);
    }

  return (
    <Box sx={{ display: 'flex' }}>
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