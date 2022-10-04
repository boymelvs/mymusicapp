import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/profile/avatar.png";
import Notfound from "../modal/Notfound";
import EditProfile from "./EditProfile";

const ViewProfile = ({ songs, isAdmin, setIsAdmin }) => {
   let faveSongsRender;
   const [showEdit, setShowEdit] = useState(false);
   const [user, setUser] = useState(isAdmin);

   useEffect(() => {
      setUser(isAdmin);
   }, [isAdmin]);

   faveSongsRender = songs.map((song, idx) => {
      return (
         <div className="cardSong" key={song.id || idx}>
            <div className="cardSongImg">
               <img src={song.album_img} alt={song.artist_name} className="songImg" />
            </div>

            <div className="titleArtist">
               <div className="cardSongTitle">{song.title}</div>

               <div className="cardSongArtist">{`by ${song.artist_name}`}</div>
            </div>
         </div>
      );
   });

   if (!songs[0]) {
      faveSongsRender = <Notfound value="Records" />;
   }

   const onEdit = () => {
      setShowEdit(true);
   };

   const capitalize = (str) => {
      return str && str.charAt(0).toUpperCase() + str.slice(1);
   };

   return (
      <div className="profileContainer">
         <div className="profile">
            <div className="profileCard">
               <div className="profPic">
                  <img src={user.image || avatar} alt={user.first_name} />
               </div>

               <div className="profInfo">
                  <div className="name">
                     {`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}

                     <div className="edit" onClick={onEdit}>
                        Edit
                     </div>
                  </div>

                  <div className="email">{user.email}</div>
               </div>
            </div>
         </div>

         <div className="favoritesContainer">
            <h2>List of Songs</h2>
            <div className="favorites">{faveSongsRender}</div>
         </div>
         {showEdit && <EditProfile user={user} setUser={setUser} setShowEdit={setShowEdit} setIsAdmin={setIsAdmin} />}
      </div>
   );
};

export default ViewProfile;
