import React, { useState } from "react";
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
  const [url, setUrl] = useState(null); // State to store the selected audio URL
  const [playlist, setPlaylist] = useState([]);

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

  // Function to handle file upload
  const handleChange = (e) => {
    const files = e.target.files;

    Promise.all(Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
          resolve({ name: file.name, url: event.target.result });
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    })).then(newPlaylist => {
      setPlaylist(prevList => [...prevList, ...newPlaylist]);
      alert('Playlist Created');
    }).catch(error => {
      console.error('Error reading file:', error);
    });
  };



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
          <VisuallyHiddenInput type="file" id="uploadedFile" accept=".mp3" multiple onChange={handleChange} />
        </Button>
      </div>
      <div className="listSection">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {playlist.map((item, index) => (
            <ListItem
              key={index}
              disableGutters
              onClick={() =>  setUrl(item.url)} // Pass the URL to handleClick
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
      <div className="playerSection">
        {url && ( // Render audio element only if URL is selected
          <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>
    </div>
  );
};

export default Player;
