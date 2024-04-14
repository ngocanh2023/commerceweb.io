const nodemailer = require("nodemailer");
const UserProductData = require("../models/email");
const User = require("../models/user");

exports.sendmail = async (req, res, next) => {
  const proArr = req.body.productArray;
  const sum = req.body.sum;
  const cusData = req.body.customerArray;
  const time = req.body.date;
  const email = cusData[0].email;
  const name = cusData[0].name;
  const phone = cusData[0].phone;
  const address = cusData[0].address;
  const date = req.body.date;

  // console.log("cusData", cusData, typeof cusData);
  // console.log("req.body", req.body);

  const userProductData = new UserProductData({
    customerArray: cusData,
    productArray: proArr,
    date: date,
    sum: sum
  });

  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  const tableData = proArr.map((item) => {
    return `<tr>
        <td style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">${
          item.data.name
        }</td>
        <td style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;"><img src="${
          item.data.img1
        } alt="" style="width:15vw;height:15vh;" /></td>
        <td style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">${formatter.format(
          item.data.price
        )}</td>
        <td style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">${
          item.count
        }</td>
        <td style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">${formatter.format(
          item.data.price * item.count
        )} VND</td>
      </tr>`;
  });

  const subject = "New Contact Request";
  const bodyID = `
  <h3>Welcome ${cusData[0].name}</h3>
  <h5>Phone: ${cusData[0].phone}</h5>
  <h5>Address: ${cusData[0].address}</h5>
  <table>
    <thead>
    <tr>
        <th style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">Name</th>
        <th style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">Image</th>
        <th style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">Price</th>
        <th style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">Amount</th>
        <th style="border-bottom:0.1rem solid grey; border-right:0.1rem solid grey;">Total Price</th>
    </tr>
    </thead>
    <tbody id="tableBody"> ${tableData} </tbody>
  </table>
  <h4>Final Total Price: ${formatter.format(sum)} VND</h4>
  <h5>Thank you very much!</h5>
  <h5>${time}</h5>
`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", // enter host name
    port: 587, //enter port name
    secure: false, // true for 465, false for other ports
    auth: {
      user: "anhvnfx18783@funix.edu.vn", // write your smtp account user name
      pass: "rrde ggpg gowe dhoy", // write your smtp account user password
    },
    tls: {
      rejectUnauthorized: false, // Important for sendimg mail from localhost
    },
  });

  // send mail with defined transport object
  //   console.log("bodyID", bodyID);
  //   console.log("subject", subject);
  let info = await transporter.sendMail({
    from: "anhvnfx18783@funix.edu.vn", // sender address
    to: [`${email}`], // list of receivers
    subject: subject, // Subject line
    text: "Hello World", // plain text body
    html: bodyID, // html body
  });

  if (!name || !email || !phone || !address) {
    // Check if any field is empty or not !!!
    res.status(200).json({
      msg: "Some Fields Are Empty !!!",
    });
  } else {
    userProductData
      .save()
      .then((items) => {
        // console.log("items", items);
        res.status(200).json({
          msg: "Success",
          info
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

exports.getProducts = async (req, res, next) => {
  await UserProductData.find()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.log(e);
    });
};
exports.getProductsID = (req, res, next) => {
  const idOrder = req.query._id;
  // console.log("req.query", req.query);
  UserProductData.findById(idOrder)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.log(e);
    });
};
exports.postUserId = (req, res, next) => {
  const email = req.body.email;
  // console.log('email', email, req.body);
  
  User.find({email})
  .then(result => {
    res.json(result[0]._id)})
  .catch(e => {console.log(e)})
}
