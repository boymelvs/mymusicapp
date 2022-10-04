import React, { useState } from "react";
import { login } from "./FormValidation";
import axios from "axios";
import swal from "sweetalert";

const Login = ({ setIsAdmin, startSearch }) => {
   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const onInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   const onFormSubmit = (e) => {
      e.preventDefault();
      const data = {
         email: user.email,
         password: user.password,
      };

      if (login) {
         axios
            .post("/users/login", data)
            .then((res) => {
               // console.log(res);
               setIsAdmin(res.data);
               startSearch();
               swal("Welcome To Music App!", "", "success");
            })
            .catch((err) => {
               swal("Error!", err.response.data.message, "error");
            });
      }
   };

   return (
      <div className="loginContainer">
         <form action="" id="loginForm" onSubmit={onFormSubmit}>
            <div className="field email-container">
               <label htmlFor="email">Email</label>
               <input type="email" name="email" id="email" className="form-field" value={user.email} onChange={onInputChange} required />
               <div className="warning">Invalid email. Must not empty.</div>
            </div>

            <div className="field subject-container">
               <label htmlFor="subject">Password</label>
               <input type="password" name="password" id="password" className="form-field" value={user.password} onChange={onInputChange} required />
               <div className="warning">Must not empty. </div>
            </div>

            <input type="submit" className="loginBtn" value="Login" />
         </form>
      </div>
   );
};

export default Login;
