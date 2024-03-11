import React from "react";
import { useState } from "react";
import "./Player.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';

const Player = () => {
  
  const [playlist, setPlaylist] = useState([{
    name: 'playlist',
    author:"shubham"
  }]);
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const handleChange = ()=>{
    alert('Please select');
  }

  return (
    <div className="player">
      <h3>Audio Player</h3>
      <div className="uploadSection">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          
        >
          Upload file
          <VisuallyHiddenInput type="file" id="uploadedFile" onChange={handleChange}/>
        </Button>
      </div>
      <div className="listSection">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {playlist.map((item,index) => (
        <ListItem
          key={item+index}
          disableGutters
          secondaryAction={
            <IconButton aria-label="play">
              <PlayCircleFilledWhiteRoundedIcon />
            </IconButton>
          }
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
      </div>
    </div>
  );
};

export default Player;
