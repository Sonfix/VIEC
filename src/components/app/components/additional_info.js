import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
          defaultValue = ""
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
          defaultValue = ""
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
          defaultValue = ""
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
          defaultValue=""
          onChange={props?.onInfoChanged}
        />
      </Box>

        </>
    );
}