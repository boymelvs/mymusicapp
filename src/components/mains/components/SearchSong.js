import React from "react";
import axios from "axios";
import playBtn from "../../../assets/images/player/plays.svg";
import paused from "../../../assets/images/player/paused.svg";
import heart from "../../../assets/images/fave/heart.svg";
import addHeart from "../../../assets/images/fave/heart1.png";

const SearchSong = ({ songs, index, playSearch, music, setAllTracks, allTracks, isAdmin, setIsAdmin, onDeleteFavorites }) => {
   const onSongClick = (idx) => {
      playSearch(idx);
   };

   const addTo = (song) => {
      const isAdded = allTracks.includes(song);
      const data = {
         user_id: isAdmin.id,
         track_id: song.id,
         title: song.title,
         track: song.track,
         artist_name: song.artist_name,
         album_img: song.album_img,
      };

      if (isAdded) {
         onDeleteFavorites(song);
         return;
      }

      // save favorite song to db
      if (isAdmin.id && !isAdded) {
         axios
            .post("users/add-song", data)
            .then((res) => {
               if (res.status === 200) {
                  // console.log(res.data);
                  setAllTracks([...allTracks, song]);
                  if (isAdmin.favorites) {
                     setIsAdmin({ ...isAdmin, favorites: [...isAdmin.favorites, song] });
                  }
               }
            })
            .catch((err) => {
               console.log("My Error", err);
            });
      }
   };

   const isAdd = (song) => {
      let result = false;

      for (let track of allTracks) {
         if (track.id === song.id) {
            result = true;
            break;
         }
      }

      return result;
   };

   const faveSongsRender = songs.map((song, idx) => {
      return (
         <div className="cardSong" key={song.id || idx}>
            {isAdmin.id && <img src={isAdd(song) ? addHeart : heart} alt="favorites" className="heart" onClick={(e) => addTo(song)} />}

            <div className="cardSongImg" onClick={() => onSongClick(idx)}>
               <img src={song.album_img} alt={song.artist_name} className="songImg" />

               <img src={music.isPlaying && index === idx ? paused : playBtn} alt="play" className="playBtn" />
            </div>

            <div className="titleArtist">
               <div className="cardSongTitle">{song.title}</div>

               <div className="cardSongArtist">{`by ${song.artist_name}`}</div>
            </div>
         </div>
      );
   });

   return (
      <div className="songContainer">
         <h2>Results </h2>
         <div className="cardSongContainer">{faveSongsRender}</div>
      </div>
   );
};

export default SearchSong;
