import * as React from 'react';
import ImageCarousel from './image_carousel';

import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function ImageSelection(props) {
    const inputFile = React.useRef(null);

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
      };

    const onFileChange = (event) => {
        // event.stopPropagation();
        // event.preventDefault();
        // var file = event.target.files[0];
        // console.log(file);
        // this.setState({file}); /// if you want to upload latter
        props?.onImageUpload(event)
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}  >
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}}  accept="image/png,image/jpeg" onChange={onFileChange} multiple/>
            <CardActionArea
                onClick={() => onButtonClick()}
                sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '20px',
                    border: '1px solid ',
                    margin: "0 auto",
                    width: '50%',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-btween",
                    alignItems: "center", 
                }}  >
                <CardContent>
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", 
                        minHeight: "150px" ,
                        height: "fit-content"                    
                        }}
                    >
                        {props?.images.length === 0 && 
                            <CollectionsIcon 
                                color="primary"
                                sx={{
                                    fontSize: { xs: 56, sm: 64 },
                                    margin: "0 auto",
                                    left: "50%",
                                    height: "50%"
                                }}
                            />
                        }
                        {props?.images.length > 0 &&
                            <ImageCarousel images={props?.images}/>
                        }
                    </Box>
                </CardContent>
                {props?.images.length === 0 && 
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Bilder
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Du kannst hier einfach deine Bilder per Klick hochladen, oder ziehe sie einfach per Drag&Drop hier rein!
                        Bitte achte darauf das ein Bild nicht größer als 5MB ist!
                    </Typography>
                    </CardContent>
                }
            </CardActionArea>
        </Box>
    );
}