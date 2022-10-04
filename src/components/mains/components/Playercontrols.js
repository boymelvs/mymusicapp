import React, { useState } from "react";
import Playerbuttons from "./Playerbuttons";
import play from "../../../assets/images/player/plays.svg";

const Playercontrols = ({ music, songs, setMusic, audioPlayer, index, setIndex, songTimer }) => {
   const [volume, setVolume] = useState(0.3);

   const onChangeVolume = (e) => {
      const value = e.target.value;
      const name = e.target.name;

      setVolume(value);
      audioPlayer.current[name] = value;
   };

   // const newIndex = index < songs.length - 1 ? index + 1 : index;
   const newIndex = index < songs.length - 1 ? index : index;

   const nextSong = () => {
      setIndex(newIndex);
   };

   const formatTimes = (songTimer) => {
      const newDate = new Date(2000, 0, 1);
      newDate.setSeconds(songTimer);
      let sec = newDate.toTimeString().slice(0, 8);

      if (songTimer > 86399) {
         sec = Math.floor((newDate - Date.parse("1/1/70")) / 3600000) + sec.slice(2);
      }

      return sec.slice(3);
   };

   return (
      <div className="playerControls">
         <div className="nextToPlay" onClick={nextSong}>
            <div className="nextToPlayImgContainer">
               <img src={songs[newIndex].album_img} alt={songs[newIndex].artist_name} className="nextPlayImg" />

               <img src={play} alt="play" className="nextPlayBtn" />
            </div>

            <div className="nextPlayTitleArtist">
               <div className="nextPlayTitle">{songs[newIndex].title}</div>

               <div className="nextPlayArtist">{`by ${songs[newIndex].artist_name}`}</div>
            </div>

            {/* <div className="nextSongText">{`${songs.length - 1 === index ? "Last Song" : "Next Song"}`}</div> */}
         </div>

         <Playerbuttons music={music} setMusic={setMusic} index={index} setIndex={setIndex} audioPlayer={audioPlayer} />

         <div className="speakerContainer">
            <div className="timer">
               <span>{`${formatTimes(songTimer.currentTime)} / ${formatTimes(songTimer.duration)}`}</span>
            </div>

            <div className="speaker">
               <input type="range" name="volume" id="volume" className="volume" min="0" max="1" step="0.05" value={volume} onChange={onChangeVolume} />
               <label htmlFor="volume">Vol.</label>
            </div>
         </div>
      </div>
   );
};

export default Playercontrols;
