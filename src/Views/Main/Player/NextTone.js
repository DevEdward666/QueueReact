import React, { useState, useEffect } from "react";
import annoucement from "../../../Assets/Music/announcement.mp3";

const NextTone = ({ handlePlay }) => {
  const [audio] = useState(new Audio(annoucement));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!handlePlay());

  useEffect(() => {
    let mounted =true;
    const handlePlayer = () => {
      if(mounted){
        if(handlePlay()){
          audio.play();
          setPlaying(false);
        } else{
          audio.pause();
          setPlaying(false);
        }
      }
    }
    mounted && handlePlayer();
    return () => {
      mounted = false;
    };
  }, [audio, handlePlay]);

  useEffect(() => {
    let mounted =true;
    const audioon = () => {
      if(mounted){
        audio.addEventListener("ended", () => handlePlay);
      }
    }
    mounted && audioon();
    return () => {
      mounted = false;
      audio.removeEventListener("ended", () => handlePlay);
    };
  }, [audio, handlePlay]);

  return [handlePlay(), toggle];
};

export default NextTone;
