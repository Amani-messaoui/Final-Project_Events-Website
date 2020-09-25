const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.address = !isEmpty(data.address) ? data.address : "";
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }
  
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  // tel checks
  if (Validator.isEmpty(data.tel)) {
    errors.tel = "Tel Number is required";
  }
  // Name checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};