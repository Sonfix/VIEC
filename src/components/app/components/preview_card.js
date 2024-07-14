import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function PreviewCard(props) {

  const shorten = (text, l) => {
    if (text === null || text === undefined) {text = "Beende deine Arbeit um ein Ergebniss zu bekommen"}

      const words = text.split(' ');
      if (words.length > l) {
        return (words.slice(0, l).join(' ')) + "..."
      }
      return text;
  }

  const onClick = (e) => {
      props?.onSelect(props?.item?.getCntId());
  }

  const getImageUrl = (item) => {
    console.log(item);
    const images = item.getImages();
    console.log(images);
    return images[0].getDownloadable()
  }

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea
        onClick={onClick}
      >
        <CardMedia
          component="img"
          height="140"
          image={getImageUrl(props?.item)}
          alt="main image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {shorten(props?.item.getLatestResponse()?.getJSON()?.Titel, 3)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {shorten(props?.item.getLatestResponse()?.getJSON()?.Beschreibung, 20)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Download
        </Button>
      </CardActions>
    </Card>
  );
}
