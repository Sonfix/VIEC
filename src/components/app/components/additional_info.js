import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDocContext } from '../../../contexts/DocumentContext';

const destLang = [
  {
    value: 'de',
    label: 'Deutsch',
  },
  {
    value: "eng",
    label: "Englisch",
  },
  {
    value: "es",
    label: "Spanisch",
  },
  {
    value: "fr",
    label: "Französisch",
  },
];

const phrasing = [
    {
        value: "prof",
        label: "Professionell",
    },
    {
        value: "colloquial",
        label: "Umgangssprachlich",
    },
    {
        value: "personal",
        label: "Perönlich",
    }
];  

const category = [
    {
        value: "home",
        label: "Haushalt",
    },
    {
        value: "pet",
        label: "Haustier",
    }
]



export default function AdditionalInfo(props) {
  const { currentDocument } = useDocContext();

  const dest_lang_ref = React.createRef();

  const getValueByLabel = (label, arr) => { 
    // console.log(currentDocument)
    // console.log(currentDocument.getPlainDescription())
    // console.log(currentDocument.getPlainDescription()[label])

    // console.log(label, arr);
    label = currentDocument.getPlainDescription()[label]
    
    if (label === null ||label === undefined) return "";
  
    arr.forEach(e => {
       if (e.label === label) {
        return e.value 
       }
       else {
        return ""
       }
    });
  }


    return (
        <>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1.5, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
        <TextField
          id="destination-language"
          select
          label="Zielsprache"
          onChange={props?.onInfoChanged}
          helperText="Wie sollen wir den Text schreiben?"
          variant="filled"
          SelectProps={{
            native: true,
          }}
          ref={dest_lang_ref}
          defaultValue = {getValueByLabel("destination-language", destLang)}
        >
          {destLang.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="phrasing"
          select
          label="Formulierung"
          onChange={props?.onInfoChanged}
          helperText="Wie sollen wir den Text schreiben?"
          variant="filled"
          defaultValue = {getValueByLabel("phrasing", phrasing)}
          SelectProps={{
            native: true,
          }}
        >
          {phrasing.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="category"
          select
          label="Kategorie"
          defaultValue = {getValueByLabel("category", category)}
          onChange={props?.onInfoChanged}
          helperText="In was für eine Kategorie gehört das für dich?"
          variant="filled"
          SelectProps={{
            native: true,
          }}
        >
          {category.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          id="context"
          label="Kontext"
          multiline
          width="100%"
          rows={4}
          defaultValue = {currentDocument.getDescription("context")}
          onChange={props?.onInfoChanged}
        />
      </Box>

        </>
    );
}