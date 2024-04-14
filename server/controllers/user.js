const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getUserRegister = async (req, res, next) => {
  User.find()
    .then((user) => {
      // console.log("user1", user);
      res.json(user);
    })
    .catch((err) => console.log(err));
};
exports.getUserOrders = async(req, res, next) => {
  const username = req.query.username;
  console.log('username', username)
   User.find({username: username})
   .then(result => {res.json(result)})
   .catch(e => {console.log(e)})
}

exports.postUserRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const checkPassword = await bcrypt.hash(password, 10);

  // console.log("req.body", req.body);

  // tim xem co bi trung thong tin dang ki khong
  const checkUnique = await User.findOne({ email });
  //checkUnique ra 1 object thêm !!checkUnique để chuyển thành true false
  // console.log("Register Uniqued!", !!checkUnique);

  if (!!checkUnique) {
    res.json({ success: false, message: "Uniqued! Register new one!" });
  } else {
    const userRegister = new User({
      username: username,
      password: checkPassword,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
    });

    userRegister
      .save()
      .then((result) => {
        // console.log("result", result);
        res.json({ success: true, message: "Successful Register!" });
      })
      .catch((err) => {
        res.json({ success: false, message: "err" });
        console.log(err);
      });
  }
};
exports.postUserLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("req.body", req.body)
  
  const checkHash = await User.findOne({ email });
  const match = await bcrypt.compare(password, checkHash?.password);
  console.log('checkHash', checkHash, checkHash._id)
  try {
    if (match === false) {
      res.send({ success: false, messages: "Wrong password!"});
    } else {
      res.send({ success: true, messages: "Successful Login!", id: checkHash._id });
    }
  } catch (e) {
    console.log(e);
  }
};
