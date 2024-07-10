import * as React from 'react';
import ImageSelection from './image_select';
import AdditionalInfo from './additional_info';
import GenerationModeSelect from './generation_mode_select';
import { useGeneration } from '../../../contexts/GenerationContext'

import { storage } from '../../../APIs/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function GenerationPage() {
    const [GenMode, setGenMode] = React.useState('weighted');
    const [URLs, setURLs] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [uploading, setUploading] = React.useState(false);
    const [selectedImages, setSelectedImages] = React.useState([]);
    const [panelExpanded, setPanelExpanded] = React.useState('info');

    const {run} = useGeneration();
  
    const onModeChange = (value) => {
      console.log(value);
      setGenMode(value);
    };

    const uploadFiles = (files) => {
      const promises = []
      
      Array.from(files).map((file) => {
          console.log('loop');

          const sotrageRef = ref(storage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(sotrageRef, file);
          setUploading(true);
          promises.push(uploadTask)
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const prog = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setProgress(prog);
              },
              (error) => console.log(error),
              async () => {
                  await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                      console.log(downloadURLs)
                    setURLs(prevState => {
                          if (Array.isArray(prevState)) {
                              return [...prevState, downloadURLs];
                          } else {
                              console.error("prevState is not an array");
                              return [downloadURLs];
                          }
                      });
                      console.log("File available at", downloadURLs);
                  });
              }
          );


      })
      Promise.all(promises)
          .then(() => setUploading(false))
          .then(err => console.log(err))

  };


    const onImageUpload = (e) => {
      e.preventDefault()
      const files = e.target.files
      setSelectedImages(files)
      if (!files.length) return;
      console.log(uploadFiles(files));
        
    }
  
    const onAdditionalInfoChange = (info) => {

    };

    const onStartGeneration = () => {
      setPanelExpanded('generation');
      run(selectedImages);
    };

    const onAccordionChange = (panel) => (event, isExpanded) => {
      setPanelExpanded(isExpanded ? panel : false); 
    }
    
  return (
    <>
    <Stack useFlexGap>
      <GenerationModeSelect onModeChanged={onModeChange}/> 
      <Accordion 
        expanded={panelExpanded === 'info'}
        onChange={onAccordionChange('info')}
        sx={{
          mt: "10px"
        }}> 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Input</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            }}
          >
            {uploading && <LinearProgress variant="determinate" value={progress} />} 
            <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  width: '100%',
                  borderRadius: '20px',
                  border: '1px solid ',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
              }}
            >   
              <ImageSelection onImageUpload={onImageUpload} images={URLs}/>      
              <Divider 
                textAlign="left"
                sx={{
                  mt: "25px",
                  mb: "25px",
                }}
              >
                Zusätzliche Informationen
              </Divider>
              <AdditionalInfo onInfoChanged={onAdditionalInfoChange}/>
              <Divider 
                textAlign="left"
                sx={{
                  mt: "25px",
                  mb: "25px",
                }}
              ></Divider>
              <Button onClick={onStartGeneration} variant="contained">Start</Button>
            </Box>
          </Box>
        </AccordionDetails>          
      </Accordion>
      <Accordion 
        expanded={panelExpanded === 'generation'}
        onChange={onAccordionChange('generation')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Content</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
    </>
  );
}