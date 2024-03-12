import React, { useState, useRef, useEffect } from "react";
import "./Player.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";

const Player = () => {
  const [playlist, setPlaylist] = useState(() => {
    const storedPlaylist = localStorage.getItem("playlist");
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(()=>{
    const lastTrackIndex = localStorage.getItem("lastTrackIndex");
    return lastTrackIndex ? JSON.parse(lastTrackIndex) : 0;
  });
  const audioRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    if (playlist.length > 0 && currentTrackIndex < playlist.length) {
      audioRef.current.src = playlist[currentTrackIndex].url;
      audioRef.current.play();
    }
  }, [playlist, currentTrackIndex]);

  const handleChange = (e) => {
    const files = e.target.files;
    const newTracks = Array.from(files).map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });
    setPlaylist((prevPlaylist) => [...prevPlaylist, ...newTracks]);
    localStorage.setItem(
      "playlist",
      JSON.stringify([...playlist, ...newTracks])
    );
  };

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
    localStorage.setItem("lastTrackIndex", index);
    
  };

  const handleTrackEnded = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="playerBody">
      <div className="trackSection">
        <div className="uploadSection">
          <h4>Upload Track</h4>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type="file"
              id="uploadedFile"
              accept=".mp3"
              multiple
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </Button>
        </div>
        <div className="listSection">
          <h4>All Tracks</h4>
          <List>
            {playlist.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => handleTrackClick(index)}
                sx={{
                  backgroundColor:
                    currentTrackIndex === index ? "#c7eaf4" : "transparent",
                  "&:hover": { backgroundColor: "#9ae6fe" },borderRadius: 2
                }}
              >
                <ListItemText primary={item.name} />
                <PlayCircleFilledWhiteRoundedIcon
                  sx={{
                    visibility:
                      currentTrackIndex === index ? "visible" : "hidden",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="playerSection">
        <div className="trackImage"></div>
        <div className="player">
          <audio
            ref={audioRef}
            controls
            autoPlay
            className="audioPlayer"
            onEnded={handleTrackEnded}
          >
            Your browser does not support the audio tag.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default Player;