import React from "react";
import { Link } from "react-router-dom";
import socialMedia from "../../assets/images/social-media/ImgMedia";

const Footers = () => {
   return (
      <footer className="myFooters">
         <div className="codedBy">
            <img src={socialMedia.copyright} alt="copyfight" />
            <div>
               <span>2022 Code by </span>
               <a href="https://github.com/boymelvs" target="_blank" rel="noreferrer noopener">
                  <span>KodegoPh WD10 Group 5</span>
               </a>
            </div>
         </div>

         <div className="termsPrivacyContainer">
            {/* <div className="policy terms">Terms & Conditions</div> | */}
            <Link to="/about" className="policy terms">
               About
            </Link>
            |
            <Link to="/privacy" className="policy privacy">
               Privacy Policy
            </Link>
         </div>
      </footer>
   );
};

export default Footers;
