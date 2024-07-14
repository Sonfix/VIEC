import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Chip } from '@mui/material';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

import * as React from 'react';

const output = [
    {
        value: "txt",
        label: "Text",
    },
    {
        value: "json",
        label: "JSON",
    },
    {
        value: "xml",
        label: "XML",
    },
    {
        value: "html",
        label: "HTML",
    },
]

const TagTable = ({ tags }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {tags.map((tag, index) => (
        <Grid item >
            <Chip label={tag} color="primary" />
        </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default function GenerationResult(props) {
    
    return (
        <>
        {props?.data?.Titel && 
            <Box sx={{ width: '100%'}}>
                <Typography variant='h5'>
                    {props?.data.Titel}
                </Typography>
            </Box>
        }
        {props?.data?.Beschreibung && 
            <Box sx={{ width: '100%', mt: "10px"}}>
                <Typography>
                    {props?.data.Beschreibung}
                </Typography>
                {props?.data.Besonderheiten && 
                    <Box>
                        <Typography variant='h6'>
                            Besonderheiten
                        </Typography>
                        <Typography>
                            {props?.data.Besonderheiten}
                        </Typography>
                    </Box>
                }
            </Box>
        }
        
        {props?.data?.Hauptmerkmale && props?.data?.Tags &&  
            <Box sx={{ width: '100%', mt: "10px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Merkmale
                    </Typography>
                        <List dense={true}>
                            {props?.data.Hauptmerkmale.map((item, index) =>(
                                <ListItem>
                                <ListItemText key={index}
                                    primary={item}
                                />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Tags
                    </Typography>
                        <TagTable tags={props?.data.Tags}/>
                    </Grid>
                </Grid>
            </Box>
        }
        <Grid container
            sx={{
                '& .MuiTextField-root': { m: 1.5, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Grid item>
            <TextField
            id="output"
            select
            label="Ausgabe"
            onChange={props?.onInfoChanged}
            helperText="Wie möchtest du deine Daten haben?"
            variant="filled"
            defaultValue = ""
            >
            {output.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
            </TextField>
            </Grid>
            <Grid item
            sx={{
                p: "25px"
            }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<DownloadIcon />}
                    >
                    Download
                    {/* <VisuallyHiddenInput type="file" /> */}
                </Button>
            </Grid>
        </Grid>
        </>
    )
}