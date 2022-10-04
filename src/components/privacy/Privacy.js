import React from "react";

const Privacy = () => {
   return (
      <div className="privacyContainer">
         <h2>MusicApp account and your Privacy</h2>
         <div className="para first_para">
            Signing up for MusicApp is free. Having an account will allow the service to provide a more personalized experience by saving your music preferences. That will also
            allow you to access your account from multiple devices, like your computer at work and your tablet at home or your phone while biking, for example.
         </div>

         <div className="para second_para">
            When signup, we ask for your first name, last name and your email and allows us to associate the account to a specific listener. It also allows us to communicate with
            you with news about our service. You can always edit your first name, and last name in the Edit Profile page of our website. You can also delete your account if you
            don't like the page of MusicApp.com.
         </div>

         <div className="para third_para">
            We do not share your email with any third party. Please contact us if you have any further questions regarding your account and privacy.
         </div>
      </div>
   );
};

export default Privacy;
