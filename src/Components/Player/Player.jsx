import React, { useState, useRef } from "react";
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
  const audioRef = useRef(null); // Reference to the audio element

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
    console.log(url);
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

  // Function to handle clicking on a playlist item
  const handleClick = (url) => {

    setUrl(null); // Set the URL
    setTimeout(()=>{
      setUrl(url)
    console.log(url);
    },20)
    if (audioRef.current) {
      audioRef.current.play(); // Play the audio
    }
  };

  return (
    <div className="playerBody">
      
      <div className="trackSection">
        <div className="uploadSection">
          <h4>Upload Track</h4>
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
          <h4>All Tracks</h4>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {playlist.map((item, index) => (
              <ListItem
                key={index}
                disableGutters
                onClick={() => handleClick(item.url)} // Pass the URL to handleClick
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
      <div className="playerSection">
        <div className="trackImage">
        </div>
        <div className="player">
          {url && (
            <audio ref={audioRef} controls autoPlay className="audioPlayer">
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
