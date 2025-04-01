// IMPORT MODELS
const USERS = require("../models/users");

// IMPORT PACKAHES
const bcrypt = require("bcrypt");
const multer = require("../config/multer");
// IMPORT MIDDLEWARES
const {
  checkingDataComplete,
  checkEmailFormat,
  checkPasswordFormat,
  formatingSignupData,
  checkingEmailExist,
} = require("../middlewares/users");
//
exports.signupControllers = async (req, res) => {
  // CHECKING DATA REQUIRED
  const checkingData = await checkingDataComplete(req.body);
  if (checkingData === "ERROR") {
    return res
      .status(400)
      .json({
        error:
          "Certaines données requises sont absentes, veuillez compléter le formulaire !",
      });
  }
  // FORMATING DATA
  const formatData = formatingSignupData(req.body);
  // CHECKING EMAIL/PASSWORD FORMAT
  const emailFormat = checkEmailFormat(formatData.email);
  if (emailFormat !== true) {
    return res
      .status(400)
      .json({ error: "L'adresse Email ne respecte le format demandé !" });
  }
  //
  const passwordFormat = checkPasswordFormat(formatData.password);
  if (passwordFormat !== true) {
    return res
      .status(400)
      .json({
        error:
          "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 nombre et 1 caractère spécial !",
      });
  }
  // CHECKING IF EMAIL AND PSEUDO EXIST
  const emailExist = await checkingEmailExist(formatData.email);
  if (emailExist === true) {
    return res
      .status(400)
      .json({
        error: "Cet email est déjà enregistré, veuillez vous connecter !",
      });
  }
  //
  const pseudoExist = await USERS.findOne({
    where: { pseudo: formatData.pseudo },
  });
  if (pseudoExist) {
    return res
      .status(400)
      .json({
        error: "Ce pseudo est déjà utilisé, veuillez en choisir un autre !",
      });
  }
  // ASH PASSWORD
  const passwordHashed = await bcrypt.hash(formatData.password, 10);
  formatData.password = passwordHashed;
  // RENAME AVATAR FILE
  if (formatData.avatar !== "") {
    const pictureFile = JSON.parse(JSON.stringify(req.files.userFile))[0];
    formatData.avatar = pictureFile.fileName;
  }
  // CREATE USER
  const newUser = USERS.build(formatData);
  // SAVE USER
  try {
    await newUser.save();

    return res.status(201).json({
      message:
        "Le compte de l'utilisateur a été créé avec succès, vous pouvez maintenant vous connecter !",
      userId: newUser.userId,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "createUser : serveur indisponible", data: error });
  }
};

exports.loginControllers = async (req, res) => {};

exports.getAllUsersControllers = async (req, res) => {
  try {
    const users = await USERS.findAll();

    console.log("USERS : ", users);

    if (users.length === 0){
      return res.status(404).json({error: "Il n'y a aucun utilisateur d'enregistré !"})
    }

// PASSWORD DELETION
    users.forEach((user) => {
      user.password = ""
    })

// CONVERSION STRING TO ARRAY FOR FOLLOWERS, FOLLOWING AND LIKE
    users.forEach((user) => {
      if (user.followers === ""){user.followers = []} else {user.followers = users.followers.split(",")}
      if (user.following === ""){user.following = []} else {user.following = users.following.split(",")}
      if (user.like === ""){user.like = []} else {user.like = users.like.split(",")}
    })

    return res.status(200).json({message: "Les données des utilisateurs sont chargées !", users: users});

  } catch (error) {
    return res
      .status(500)
      .json({ message: "getAllUsers : serveur indisponible", data: error });
  }
};

exports.getOneUsersControllers = async (req, res) => {
  try {
    const user = await USERS.findOne({
      where: { userId: req.params.id },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "L'utilisateur n'a pas été trouvé !" });
    }
    // PASSWORD DELETION
    user.password = "";

    // CONVERSION STRING TO ARRAY FOR FOLLOWERS, FOLLOWING AND LIKE
    if (user.followers === ""){user.followers = []} else {user.followers = user.followers.split(",")}
    if (user.following === ""){user.following = []} else {user.following = user.following.split(",")}
    if (user.like === ""){user.like = []} else {user.like = user.like.split(",")}

    return res.status(200).json({
      message: "Les données du compte de l'utilisateur ont été chargées !",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "getOneUser : serveur indisponible", data: error });
  }
};

exports.updateUsersControllers = async (req, res) => {};

exports.deleteUsersControllers = async (req, res) => {};
