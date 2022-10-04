import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headers from "./components/headers/Headers";
import Main from "./components/mains/Main";
import Footers from "./components/footers/Footers";
// import sampleSongs from "./assets/songs/SongData";
import sampleSong from "./assets/songs/Songs";
import loadingImg from "./assets/images/fave/loading.svg";
import randomSongs from "./components/randomSongs/RandomSongs";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://musicappserver-kodego-proj.herokuapp.com/";

function App() {
   let navigate = useNavigate();
   const [songs, setSongs] = useState([]);
   const [allTracks, setAllTracks] = useState([]);
   const [loading, setLoading] = useState(false);
   const [index, setIndex] = useState(0);
   const [music, setMusic] = useState({
      isPlaying: false,
      isLength: songs.length,
   });

   const datas = localStorage.getItem("logInfo");
   const logInfo = datas ? JSON.parse(datas) : {};
   const [isAdmin, setIsAdmin] = useState(logInfo);

   useEffect(() => {
      const logInfo = JSON.stringify(isAdmin);
      localStorage.setItem("logInfo", logInfo);

      if (!isAdmin.id) {
         localStorage.removeItem("logInfo");
         navigate("/");
      } else {
         setAllTracks(isAdmin.favorites ? isAdmin.favorites : []);
      }

      if (songs.length === 0) {
         startSearch();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAdmin]);

   const playSearch = (index) => {
      setMusic({ ...music, isPlaying: true });
      setIndex(index);
   };

   const startSearch = (value = randomSongs) => {
      const data = { search: value };
      setLoading(true);

      axios
         .post("/search", data)
         .then((res) => {
            // console.log(res.data);
            setSongs(res.data);
            setMusic({ ...music, isPlaying: false, isLength: res.data.length });
            navigate("/");
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setSongs(sampleSong);
         });
   };

   return (
      <div className="container">
         <Headers startSearch={startSearch} music={music} setMusic={setMusic} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

         {loading ? (
            <div className="loadingContainer">
               <img src={loadingImg} alt="" />
               <div className="loadingText">Loading...</div>
            </div>
         ) : (
            <Main
               songs={songs}
               index={index}
               setIndex={setIndex}
               playSearch={playSearch}
               music={music}
               setMusic={setMusic}
               allTracks={allTracks}
               setAllTracks={setAllTracks}
               isAdmin={isAdmin}
               setIsAdmin={setIsAdmin}
               startSearch={startSearch}
            />
         )}

         <Footers />
      </div>
   );
}

export default App;
