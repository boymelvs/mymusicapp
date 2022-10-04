import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import avatar from "../../assets/images/profile/avatar.png";

const EditProfile = ({ user, setUser, setShowEdit, setIsAdmin }) => {
   const [editUser, setEditUser] = useState(user);
   const [profilePhoto, setProfilePhoto] = useState({ file: "", imagePreview: "" });
   const [checkFilesize, setCheckFilesize] = useState({
      size: 0,
      isBig: false,
   });
   let navigate = useNavigate();

   useEffect(() => {
      setEditUser(user);
   }, [user]);

   const onInputChange = (e) => {
      let value = e.target.value;

      if (e.target.name === "image") {
         value = e.target.files[0];

         if (value.size / (1024000 * 2) > 2) {
            setCheckFilesize({ ...checkFilesize, isBig: true });
            return;
         }

         //display photo before send to db
         const reader = new FileReader();
         reader.onloadend = () => {
            setProfilePhoto({ file: value, imagePreview: reader.result });
         };

         reader.readAsDataURL(value);
      }

      setEditUser({ ...editUser, [e.target.name]: value });
      setCheckFilesize({ ...checkFilesize, isBig: false });
   };

   const onFormSubmit = (e) => {
      e.preventDefault();

      if (checkFilesize.isBig) {
         return;
      }

      setShowEdit(false);
      setUser(editUser);

      const formData = new FormData();

      for (let field in user) {
         formData.append(field, editUser[field]);
      }

      axios
         .post("/users/profile", formData)
         .then((res) => {
            // console.log(res, "after edit");
            swal("Saved!", "", "success");
            setIsAdmin({ ...editUser, image: res.data.image });
            navigate("/profile");
         })
         .catch((err) => {
            swal("Error!", err.response.data.message, "error");
            console.log(err);
         });
   };

   const onConfirmDelete = (e) => {
      e.preventDefault();
      const id = editUser.id;

      swal("Warning!", `Do want to delete? "${editUser.first_name}"`, "warning", { dangerMode: true, buttons: true }).then((confirm) => {
         if (confirm) {
            axios
               .delete(`/users/delete/${id}`)
               .then((res) => {
                  // console.log(res.data);
                  swal("Deleted", res.data.message, "success");
                  setIsAdmin({});
                  localStorage.removeItem("logInfo");
                  localStorage.removeItem("saveTracks");
                  navigate("/");
               })
               .catch((err) => {
                  swal("Error", "Unable to delete", "error");
               });
         }
      });
   };

   const onChangePhoto = () => {
      if (profilePhoto.imagePreview) {
         return profilePhoto.imagePreview;
      }

      return editUser.image || avatar;
   };

   return (
      <div className="editProfileContainer">
         <div className="profile">
            <h2>Update Your Profile</h2>
            <button type="button" className="delete" onClick={onConfirmDelete}>
               Delete
            </button>

            <form action="" id="editProfileForm" onSubmit={onFormSubmit}>
               <div className="infoContainer">
                  <div className="namesContainer">
                     <div className="field firstName-container">
                        <label htmlFor="email">First Name</label>
                        <input type="text" name="first_name" id="first_name" className="form-field" value={editUser.first_name} onChange={onInputChange} maxLength="80" required />
                     </div>

                     <div className="field lastName-container">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" id="last_name" className="form-field" value={editUser.last_name} onChange={onInputChange} maxLength="80" required />
                     </div>
                  </div>

                  <div className={`warning ${checkFilesize.isBig && "active"}`}>File size is over 2mb</div>
                  <label htmlFor="imageInput" className="profilePicContainer">
                     <img src={onChangePhoto()} className="profPic" alt="" />
                     <input className="uploadPhoto" name="image" id="imageInput" type="file" accept="image/*" onChange={onInputChange} />
                     <span className="uploadText">
                        Upload
                        <span className="size"> size: 2mb</span>
                     </span>
                  </label>
               </div>

               <div className="btnContainer">
                  <button type="submit" className="btn deleteBtn" onClick={onFormSubmit}>
                     Save
                  </button>

                  <button type="button" className="btn cancelBtn" onClick={() => setShowEdit(false)}>
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditProfile;
