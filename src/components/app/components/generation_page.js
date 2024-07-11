import * as React from 'react';
import ImageSelection from './image_select';
import AdditionalInfo from './additional_info';
import GenerationModeSelect from './generation_mode_select';
import { useGeneration } from '../../../contexts/GenerationContext'
import GenerationResult from './gen_result';

import { storage } from '../../../APIs/firebase';
import { useAuth } from "../../../contexts/AuthContext";
import { useDocContext } from '../../../contexts/DocumentContext';

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
import CircularProgress from '@mui/material/CircularProgress';

export default function GenerationPage(props) {
    const [GenMode, setGenMode] = React.useState('weighted');
    const [URLs, setURLs] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [uploading, setUploading] = React.useState(false);
    const [selectedImages, setSelectedImages] = React.useState([]);
    const [panelExpanded, setPanelExpanded] = React.useState('info');

    const [storageFileNames, setStorageFileNames] = React.useState([])

    const {run, loading} = useGeneration();
    const { addImagesToDescription, currentDocument, addDescriptor } = useDocContext();
    const { currentUser } = useAuth();

    const onModeChange = (value) => {
      console.log(value);
      setGenMode(value);
    };

    const uploadFiles = (files) => {
      const promises = []
      
      Array.from(files).map((file) => {

          let fileName = `files/${currentUser.uid}/${file.name}`
          
          storageFileNames.push({
            name: fileName,
            type: file.type,
            file: file,
          } );
          setStorageFileNames(storageFileNames);

          const sotrageRef = ref(storage, fileName);
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
                    setURLs(prevState => {
                          if (Array.isArray(prevState)) {
                              return [...prevState, downloadURLs];
                          } else {
                              console.error("prevState is not an array");
                              return [downloadURLs];
                          }
                      });
                      // console.log("File available at", downloadURLs);
                  });
              }
          );


      })
      Promise.all(promises)
          .then(() => {
            setUploading(false);

            if (currentDocument !== null) {
              addImagesToDescription(currentDocument, storageFileNames)
            }
            console.log(currentDocument)

            // _set_documents()
          })
          .then(err => console.log(err))

  };


    const onImageUpload = (e) => {
      e.preventDefault()
      const files = e.target.files
      setSelectedImages(files)
      
      if (!files.length) return;
      uploadFiles(files)
        
    }
  
    const onAdditionalInfoChange = (info) => {
      console.log({id: info.target.id, value: info.target.value})
      addDescriptor(currentDocument, {id: info.target.id, value: info.target.value})
    };

    const onStartGeneration = () => {
      setPanelExpanded('generation');
      
      // _set_documents();
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
          {!loading && <GenerationResult data={currentDocument?.getLatestResponse()?.getJSON()}/>}
          {loading && <CircularProgress />}
        </AccordionDetails>
      </Accordion>
    </Stack>
    </>
  );
}