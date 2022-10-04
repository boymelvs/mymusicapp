import React from "react";

const DeleteModal = ({ song, onDeleteFavorites, setShowModal }) => {
   const onConfirm = (e) => {
      e.preventDefault();
      setShowModal(false);
      onDeleteFavorites(song);
   };

   return (
      <div className="modalContainer">
         <div className="modal">
            <form className="modalForm">
               <div className="modalName">
                  <h2>Are you sure?</h2>
               </div>

               <div className="btnContainer">
                  <button type="submit" className="btn deleteBtn" onClick={onConfirm}>
                     Delete
                  </button>

                  <button type="button" className="btn cancelBtn" onClick={() => setShowModal(false)}>
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default DeleteModal;
