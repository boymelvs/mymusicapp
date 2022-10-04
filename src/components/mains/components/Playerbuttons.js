import React, { useEffect } from "react";
import play from "../../../assets/images/player/play.svg";
import pause from "../../../assets/images/player/paused.svg";
import rewind from "../../../assets/images/player/rewind.svg";
import forward from "../../../assets/images/player/forward.svg";

const Playerbuttons = ({ music, setMusic, index, setIndex, audioPlayer }) => {
   useEffect(() => {
      const onLastSong = (index) => {
         if (index < music.isLength - 1) {
            index += 1;
         } else {
            index = 0;
            setMusic({ ...music, isPlaying: !music.isPlaying });
         }

         setIndex(index);
      };

      audioPlayer.current.onended = () => {
         onLastSong(index);
      };
   });

   const onBtnClick = (e) => {
      const name = e.target.name;

      if (name === "play") {
         setMusic({ ...music, isPlaying: !music.isPlaying });
      }

      if (name === "next" && index < music.isLength - 1) {
         setIndex(index + 1);
      }

      if (name === "previous" && index > 0) {
         setIndex(index - 1);
      }
   };

   return (
      <div className="playerBtnContainer">
         <img src={rewind} alt="rewind" className="controlIcon" name="previous" title="Previous" onClick={onBtnClick} />

         <img src={music.isPlaying ? pause : play} alt="play" className="controlIcon" name="play" title="Toggle play" onClick={onBtnClick} />

         <img src={forward} alt="forward" className="controlIcon" name="next" title="Next" onClick={onBtnClick} />
      </div>
   );
};

export default Playerbuttons;
