/* validation if empty */
const isRequired = (value) => {
   return value ? true : false;
};

/* showWarning if invalid/valid */
const showWarning = (element, isAdded) => {
   isAdded === "remove" ? element.classList.remove("active") : element.classList.add("active");
   isAdded === "remove" ? element.classList.add("green-border") : element.classList.remove("green-border");
};

/* validation for first_name */
const checkFirstName = (item) => {
   let value = item.first_name.value.trim();
   let maxLength = value.length;
   let element = item.first_name;

   if (isRequired(value) && maxLength < 80) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   showWarning(element, "add");
   return false;
};

/* validation for last_name */
const checkLastName = (item) => {
   let value = item.last_name.value.trim();
   let maxLength = value.length;
   let element = item.last_name;

   if (isRequired(value) && maxLength < 80) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   showWarning(element, "add");
   return false;
};

/* validation for email */
const checkEmail = (item) => {
   let value = item.email.value.trim();
   let maxLength = value.length;
   let element = item.email;

   const emailFormat = /[^@ \t\r\n]+@[^@ \t\r\n]+\.(\w{2,3})+$/;
   const isEmailCorrect = emailFormat.test(value);

   if (isRequired(value) && maxLength < 100 && isEmailCorrect) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   showWarning(element, "add");
   return false;
};

/* validation for password */
const checkPassword = (item) => {
   let value = item.password.value.trim();
   let maxLength = value.length;
   let element = item.password;

   if (isRequired(value) && maxLength >= 8 && maxLength < 250) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   showWarning(element, "add");
   return false;
};

/* validation for subject */
const checkConfirmPassword = (item) => {
   let confirm_password = item.confirm_password.value;
   let password = item.password.value.trim();
   let element = item.confirm_password;

   if (isRequired(confirm_password) && confirm_password === password) {
      return true;
   }

   showWarning(element.nextElementSibling, "add");
   showWarning(element, "add");
   return false;
};

/* remove warning once input is valid */
const removeWarning = (element) => {
   showWarning(element, "remove");
   showWarning(element.nextElementSibling, "remove");
};

/* ================= REAL TIME FORM VALIDATION ================= */
let timeOut;

export const realTimeChecking = (inputElem, value) => {
   let getId = value;

   if (timeOut) {
      clearTimeout(timeOut);
   }

   timeOut = setTimeout(() => {
      switch (getId) {
         case "first_name":
            if (checkFirstName(inputElem)) {
               let element = inputElem.first_name;
               removeWarning(element);
            }
            break;

         case "last_name":
            if (checkLastName(inputElem)) {
               let element = inputElem.last_name;
               removeWarning(element);
            }
            break;

         case "email":
            if (checkEmail(inputElem)) {
               let element = inputElem.email;
               removeWarning(element);
            }
            break;

         case "password":
            if (checkPassword(inputElem)) {
               let element = inputElem.password;
               removeWarning(element);
            }
            break;

         case "confirm_password":
            if (checkConfirmPassword(inputElem)) {
               let element = inputElem.confirm_password;
               removeWarning(element);
            }
            break;

         default:
            return "ERROR";
      }
   }, 500);
};

/* ================= CHECK ALL INPUT VALUE WHILE SIGNUP ================= */
export const signup = (element) => {
   /* ================= FORMS SUBMISSION ================= */

   if (checkFirstName(element) && checkLastName(element) && checkEmail(element) && checkPassword(element) && checkConfirmPassword(element)) {
      return true;
   }

   return false;
};

/* ================= CHECK ALL INPUT VALUE WHILE SIGNUP ================= */
export const login = (element) => {
   /* ================= FORMS SUBMISSION ================= */

   if (checkEmail(element) && checkPassword(element) && checkConfirmPassword(element)) {
      return true;
   }

   return false;
};
