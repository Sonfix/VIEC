import * as React from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function GenerationPage() {
    const [paymentType, setPaymentType] = React.useState('creditCard');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cvv, setCvv] = React.useState('');
    const [expirationDate, setExpirationDate] = React.useState('');
  
    const handlePaymentTypeChange = (event) => {
      setPaymentType(event.target.value);
    };
  
    const handleCardNumberChange = (event) => {
      const value = event.target.value.replace(/\D/g, '');
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      if (value.length <= 16) {
        setCardNumber(formattedValue);
      }
    };
  
    const handleCvvChange = (event) => {
      const value = event.target.value.replace(/\D/g, '');
      if (value.length <= 3) {
        setCvv(value);
      }
    };
  
    const handleExpirationDateChange = (event) => {
      const value = event.target.value.replace(/\D/g, '');
      const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
      if (value.length <= 4) {
        setExpirationDate(formattedValue);
      }
    };
    
  return (
    <>
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
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
            }}
          >
            <CardActionArea>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
            }}
          >
            <CardActionArea>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Bank account</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>

      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <Typography variant="subtitle2">Bilder</Typography> */}
              {/* <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} /> */}
              <Box
                id="test"
                sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '20px',
                    border: '1px solid ',
                    margin: "0 auto",
                    width: '50%',
                    height: '250px',
                }}
              >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <CollectionsIcon 
                        sx={{
                            fontSize: { xs: 48, sm: 56 },
                            margin: "0 auto",
                            left: "50%",
                            height: "50%"
                        }}
                    />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
    </Stack>
    </>
  );
}