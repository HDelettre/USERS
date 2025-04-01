  const USERS = require("../models/users");
  //
  async function checkingDataComplete(signupData) {
    let functionResponse = "OK";
    for (const [key, value] of Object.entries(signupData)) {
      if (
        key !== "genre" &&
        key !== "avatar" &&
        key !== "followers" &&
        key !== "following" &&
        key !== "like"
      ) {
        if (value === "") {
          functionResponse="ERROR"
        }
      }
    }

    return functionResponse
  };

  function checkEmailFormat(email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const checkEmail = emailRegex.test(email);
    return checkEmail;
  }

  function checkPasswordFormat(password) {
    const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const checkPassword = passwordRegex.test(password);
  return checkPassword;
  }

  function formatingSignupData(signupData) {
    signupData.email = signupData.email.toLowerCase();
    signupData.lastName= signupData.lastName.toUpperCase();

    let firstNameFormated = signupData.firstName.toLowerCase();
  if (firstNameFormated.includes("-")) {
    const tiretLocation = firstNameFormated.search(/-/);
    firstNameFormated =
      firstNameFormated.charAt(0).toUpperCase() +
      firstNameFormated.slice(1, tiretLocation + 1) +
      firstNameFormated.charAt(tiretLocation + 1).toUpperCase() +
      firstNameFormated;
  } else {
    firstNameFormated =
      firstNameFormated.charAt(0).toUpperCase() +
      firstNameFormated.slice(1).toLowerCase();
  }
  signupData.firstName = firstNameFormated;

  return signupData;
  }

  async function checkingEmailExist (email){
    const emailExist = await USERS.findOne({
      where: {email: email}
    })
    if (emailExist){return true} else {return false}
  }


  module.exports = {
    checkingDataComplete,
    checkEmailFormat,
    checkPasswordFormat,
    formatingSignupData,
    checkingEmailExist,
  }