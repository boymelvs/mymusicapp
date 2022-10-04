import React from "react";

const Notfound = ({ value }) => {
   return (
      <div className="notFound">
         <div className="notFoundName">
            <h2>{`No  ${value ? value : "Records"}`}</h2>
         </div>
      </div>
   );
};

export default Notfound;
