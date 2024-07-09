import * as React from "react"

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BalanceIcon from '@mui/icons-material/Balance';

export default function GenerationModeSelect(props) {
  const [paymentType, setGenType] = React.useState('weighted');

  const handleGenModeChange = (mode) => {
    setGenType(mode);
    props?.onModeChanged(mode);
  };
    return(
        
      <FormControl 
        sx={{mb: "25px"}}
        component="fieldset"
        fullWidth
      >
      <RadioGroup
        aria-label="Generation-mode"
        name="generation-mode"
        sx={{
          flexDirection: { sm: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: { sm: '100%', md: '50%' },
            flexGrow: 1,
            outline: '1px solid',
            outlineColor:
              paymentType === 'weighted' ? 'primary.main' : 'divider',
            backgroundColor:
              paymentType === 'weighted' ? 'background.default' : '',
          }}
        >
          <CardActionArea onClick={() => handleGenModeChange('weighted')}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BalanceIcon color="primary" fontSize="medium" />
              <Typography fontWeight="medium">Ausgewogen</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            maxWidth: { sm: '100%', md: '50%' },
            flexGrow: 1,
            outline: '1px solid',
            outlineColor:
              paymentType === 'creativ' ? 'primary.main' : 'divider',
            backgroundColor:
              paymentType === 'creativ' ? 'background.default' : '',
          }}
        >
          <CardActionArea onClick={() => handleGenModeChange('creativ')}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiObjectsIcon color="primary" fontSize="medium" />
              <Typography fontWeight="medium">Kreativ</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RadioGroup>
    </FormControl>
    );
}