import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { signup, realTimeChecking } from "./FormValidation";

const Signup = ({ setIsAdmin }) => {
   let navigate = useNavigate();
   const formUseref = useRef();
   const [user, setUser] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      error_list: {},
   });

   const onInputChange = (e) => {
      const id = e.target.id;
      const forms = formUseref.current;

      setUser({ ...user, [e.target.name]: e.target.value, error_list: { duplicate: "", confirm_password: "" } });
      realTimeChecking(forms, id);
   };

   const onFormSubmit = (e) => {
      e.preventDefault();

      const forms = formUseref.current;
      const data = {
         first_name: user.first_name.toLowerCase(),
         last_name: user.last_name.toLowerCase(),
         email: user.email,
         password: user.password,
         confirm_password: user.confirm_password,
      };

      if (signup(forms)) {
         axios
            .post("/users/signup", data)
            .then((res) => {
               // console.log(res);
               swal("Thank You For Signing Up!", "", "success");
               setUser({ first_name: "", last_name: "", email: "", password: "", confirm_password: "", error_list: {} });
               setIsAdmin(res.data);
               navigate("/");
            })
            .catch((error) => {
               console.log(error.response.data);
               setUser({ ...user, error_list: error.response.data });
            });
      }
   };

   return (
      <div className="signupContainer">
         <form action="" id="signupForm" ref={formUseref} onSubmit={onFormSubmit}>
            <div className="fullName">
               <div className="field firstName-container">
                  <label htmlFor="first_name">First Name*</label>
                  <input type="text" name="first_name" id="first_name" className="form-field" value={user.first_name} onChange={onInputChange} maxLength="80" required />
                  <div className="warning">Must not empty.</div>
               </div>

               <div className="field lastName-container">
                  <label htmlFor="last_name">Last Name*</label>
                  <input type="text" name="last_name" id="last_name" className="form-field" value={user.last_name} onChange={onInputChange} maxLength="80" required />
                  <div className="warning">Must not empty.</div>
               </div>
            </div>

            <div className="field email-container">
               <label htmlFor="email">Email*</label>
               <input type="email" name="email" id="email" className="form-field" value={user.email} onChange={onInputChange} maxLength="100" required />
               <div className="warning" style={{ visibility: `${user.error_list.duplicate && "visible"}` }}>
                  {`${user.error_list.duplicate ? user.error_list.duplicate : "Invalid email. Must not empty."}`}
               </div>
            </div>

            <div className="field password-container">
               <label htmlFor="password">Password*</label>
               <input type="password" name="password" id="password" className="form-field" value={user.password} onChange={onInputChange} minLength="8" maxLength="250" required />
               <div className="warning">Must not empty and minimum of 8 character. </div>
            </div>

            <div className="field confirmPassword-container">
               <label htmlFor="confirm_password">Confirm Password*</label>
               <input type="password" name="confirm_password" id="confirm_password" className="form-field" value={user.confirm_password} onChange={onInputChange} required />
               <div className="warning" style={{ visibility: `${user.error_list.confirm_password && "visible"}` }}>
                  {`${user.error_list.confirm_password ? user.error_list.confirm_password : "Password does not match!"}`}
               </div>
            </div>

            <input type="submit" className="signupbtn" value="Sign up" />
         </form>
      </div>
   );
};

export default Signup;
