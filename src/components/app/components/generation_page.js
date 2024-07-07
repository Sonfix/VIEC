import * as React from 'react';
import ImageSelection from './image_select';
import AdditionalInfo from './additional_info';
import GenerationModeSelect from './generation_mode_select';

import { storage } from '../../../APIs/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';

export default function GenerationPage() {
    const [GenMode, setGenMode] = React.useState('weighted');
    const [URLs, setURLs] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [selectedImages, setSelectedImages] = React.useState([]);
  
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
                      setURLs(prevState => [...prevState, downloadURLs])
                      console.log("File available at", downloadURLs);
                  });
              }
          );


      })
      Promise.all(promises)
          .then(() => alert('All images uploaded'))
          .then(err => console.log(err))

  };


    const onImageUpload = (e) => {
      e.preventDefault()
      const files = e.target.files
      
      if (!files.length) return;
      uploadFiles(files);
        
    }
  
    const onAdditionalInfoChange = (info) => {

    };
    
  return (
    <>
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <GenerationModeSelect onModeChanged={onModeChange}/> 
      
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
            width: '100%',
            borderRadius: '20px',
            border: '1px solid ',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        }}
        >
      <ImageSelection onImageUpload={onImageUpload}/>
      
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
      
      </Box>
    </Box>
    </Stack>
    </>
  );
}