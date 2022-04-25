import React, { useState, useEffect } from "react";
import annoucement from "../../../Assets/Music/announcement.mp3";

const NextTone = ({ handlePlay }) => {
  const [audio] = useState(new Audio(annoucement));
  const [playing, setPlaying] = useState(false);
  console.log(handlePlay());
  const toggle = () => setPlaying(!handlePlay());

  useEffect(() => {
    handlePlay() ? audio.play() : audio.pause();
  }, [handlePlay]);

  useEffect(() => {
    audio.addEventListener("ended", () => handlePlay());
    return () => {
      audio.removeEventListener("ended", () => handlePlay());
    };
  }, []);

  return [handlePlay(), toggle];
};

export default NextTone;
