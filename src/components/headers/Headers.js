import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import avatar from "../../assets/images/profile/avatar.png";
import Search from "./Search";

const Headers = ({ startSearch, music, setMusic, isAdmin, setIsAdmin }) => {
   const profileCheckboxRef = useRef();
   const location = useLocation().pathname;

   const onNavItemClick = () => {
      setMusic({ ...music, isPlaying: false });
      profileCheckboxRef.current.checked = false;
   };

   const onLogout = () => {
      setIsAdmin({});
      profileCheckboxRef.current.checked = false;
      localStorage.removeItem("saveTracks");
   };

   return (
      <header className="myHeader">
         <a href="/" className="logoContainer">
            <img src={logo} alt="logo" className="logo" />
         </a>

         <nav className="myNavs">
            <Link to="/" className={`menuItem nowPlaying ${location === "/" && "active"}`} name="search" onClick={onNavItemClick}>
               Search Songs
            </Link>

            <Link to="/playlist" className={`menuItem favoriteSong ${location === "/playlist" && "active"}`} name="playlist" onClick={onNavItemClick}>
               Play Favorites
            </Link>

            <Link to="/about" className={`menuItem favoriteSong ${location === "/about" && "active"}`} name="about" onClick={onNavItemClick}>
               About
            </Link>
         </nav>

         <div className="profileSearchContainer">
            <Search startSearch={startSearch} />

            <div className="loginSignup" style={{ display: `${!isAdmin.id ? "flex" : "none"}` }}>
               <Link to="/login" className={`login ${location === "/login" && "active"}`}>
                  Login
               </Link>

               <Link to="/signup" className={`signup ${location === "/signup" && "active"}`}>
                  Signup
               </Link>
            </div>

            <div className="avatarContainer" style={{ display: `${isAdmin.id ? "flex" : "none"}` }}>
               <input type="checkbox" name="profileCheckbox" id="profileCheckbox" ref={profileCheckboxRef} />

               <label htmlFor="profileCheckbox">
                  <img src={isAdmin.image || avatar} className="avatar" alt="profile avatar" />
               </label>

               <label htmlFor="profileCheckbox" className="profile">
                  <Link to="/profile" className="viewProfile" onClick={() => (profileCheckboxRef.current.checked = false)}>
                     View Profile
                  </Link>

                  <div className="logout" onClick={onLogout}>
                     Logout
                  </div>
               </label>
            </div>
         </div>
      </header>
   );
};

export default Headers;
