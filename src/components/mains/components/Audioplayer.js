import React, { useState, useEffect, useRef } from "react";
import Playercontrols from "./Playercontrols";

const Audioplayer = ({ songs, index, setIndex, music, setMusic }) => {
   const audioPlayer = useRef(null);
   const [songTimer, setSongTimer] = useState({ currentTime: 0, duration: 0 });
   const [progressBar, setProgressBar] = useState(0);

   useEffect(() => {
      music.isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
   }, [music.isPlaying, index, songs]);

   useEffect(() => {
      audioPlayer.current.addEventListener("timeupdate", () => {
         const currentTime = audioPlayer.current ? audioPlayer.current.currentTime : 0;
         const duration = currentTime === 0 ? 0 : audioPlayer.current.duration;
         const percent = (currentTime / duration) * 100;

         setProgressBar(percent);
         setSongTimer({ ...songTimer, currentTime, duration });
      });
   });

   return (
      <div className="player">
         <audio src={songs[index].track} ref={audioPlayer} className="playerAudio"></audio>

         <div className="progress">
            <div className="progressFilled" style={{ flexBasis: `${progressBar}%` }}></div>
         </div>

         <Playercontrols music={music} songs={songs} setMusic={setMusic} audioPlayer={audioPlayer} index={index} setIndex={setIndex} songTimer={songTimer} />
      </div>
   );
};

export default Audioplayer;
