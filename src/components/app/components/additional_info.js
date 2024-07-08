import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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
          defaultValue="de"
          SelectProps={{
            native: true,
          }}
          helperText="Wie sollen wir den Text schreiben?"
          variant="filled"
        >
          {destLang.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="phrasing"
          select
          label="Formulierung"
          defaultValue="prof"
          SelectProps={{
            native: true,
          }}
          helperText="Wie sollen wir den Text schreiben?"
          variant="filled"
        >
          {phrasing.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="output"
          select
          label="Ausgabe"
          defaultValue="txt"
          SelectProps={{
            native: true,
          }}
          helperText="Wie möchtest du deine Daten haben?"
          variant="filled"
        >
          {output.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="category"
          select
          label="Kategorie"
          defaultValue="prof"
          SelectProps={{
            native: true,
          }}
          helperText="In was für eine Kategorie gehört das für dich?"
          variant="filled"
        >
          {category.map((option) => (
            <option key={option.value} value={option.value}>
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
          id="outlined-multiline-static"
          label="Kontext"
          multiline
          width="100%"
          rows={4}
          defaultValue=""
        />
      </Box>
        </>
    );
}