import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Chip, Table, TableBody, TableCell, TableRow } from '@mui/material';
import * as React from 'react';

const test_result = JSON.parse('{ "Produktname": "JBL Tune 510BT", "Titel": "JBL Tune 510BT: Kabelloser On-Ear-Kopfhörer mit kraftvollem Sound", "Beschreibung": "Der JBL Tune 510BT bietet satten JBL Pure Bass Sound und kabellose Freiheit für bis zu 40 Stunden. Mit seinem leichten und faltbaren Design ist er der perfekte Begleiter für unterwegs.", "Hauptmerkmale": [ "Kabellose Bluetooth 5.0-Verbindung", "JBL Pure Bass Sound", "Bis zu 40 Stunden Akkulaufzeit", "Schnellladefunktion (5 Minuten Laden für 2 Stunden Musik)", "Integriertes Mikrofon für freihändige Anrufe", "Leichtes und faltbares Design", "Komfortable Passform" ], "Vorteile": [ "Kraftvoller und satter Bass für ein beeindruckendes Hörerlebnis", "Kabellose Freiheit für uneingeschränkten Musikgenuss", "Lange Akkulaufzeit für stundenlanges Musikhören ohne Unterbrechung", "Schnellladefunktion für spontanen Musikgenuss", "Freihändiges Telefonieren in bester Sprachqualität", "Hoher Tragekomfort dank leichtem Design und komfortablen Ohrpolstern", "Platzsparend zusammenfaltbar für einfachen Transport" ], "Materialien": "Hochwertiger Kunststoff und weiche Ohrpolster", "Anwendungsbereiche": [ "Musikhören unterwegs", "Home-Office", "Sport", "Reisen" ], "Zielgruppe": "Musikliebhaber, die Wert auf kraftvollen Sound, kabellose Freiheit und hohen Tragekomfort legen.", "Pflegehinweise": "Mit einem trockenen Tuch reinigen.", "Besonderheiten": "Der JBL Tune 510BT zeichnet sich durch sein herausragendes Preis-Leistungs-Verhältnis aus.", "Tags": [ "JBL", "Kopfhörer", "On-Ear", "Kabellos", "Bluetooth", "JBL Pure Bass Sound", "Akkulaufzeit", "Schnellladung", "Mikrofon", "Faltbar", "Leicht", "Komfortabel", "Musik", "Unterhaltung", "Reise", "Sport" ] }')


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
        {props?.data.Titel && 
            <Box sx={{ width: '100%'}}>
                <Typography variant='h5'>
                    {props?.data.Titel}
                </Typography>
            </Box>
        }
        {props?.data.Beschreibung && 
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
        
        {props?.data.Hauptmerkmale && props?.data.Tags &&  
            <Box sx={{ width: '100%', mt: "10px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Merkmale
                    </Typography>
                        <List dense={true}>
                            {props?.data.Hauptmerkmale.map((item) =>(
                                <ListItem>
                                <ListItemText
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
        </>
    )
}