const path = require("path");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const server = http.createServer(app);
const multer = require('multer');
const fs = require('fs');
const AdminProducts = require("./models/adminProduct");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3002/chatApp", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const user = require("./routes/user");
const products = require("./routes/product");
const emailCus = require("./routes/email");
const adminLogin = require("./routes/admin")

const cors = require("cors");
app.use(cors());

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static("public"))

app.use(express.json());

app.use(user);
app.use(products);
app.use(emailCus);
app.use(adminLogin);

//Upload images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // const dir = './public/images';
//     const dir = '/'; //Duong dan dest sau localhost
//     fs.access(dir, (err) => {
//       if (err) {
//         fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//       } else {
//         cb(null, dir);
//       }
//     });
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// //Read jpg, jpeg, jfif
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|jfif|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Error: Only JPEG and JPG files are allowed!'));
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1000000 } });
// app.post("/update", upload.array("images", 10), async (req, res) => {
//   const { name, category, price, long_desc, stock, short_desc } = req.body;
//   const images = req.files.map(file => file.path);

//   console.log("files", req.files);
//   console.log("body", req.body);
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(productId, {
//       name,
//       category,
//       price,
//       long_desc,
//       stock,
//       short_desc,
//       images
//     }, { new: true });

//     res.json(updatedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// })

// app.post('/upload', upload.array('images', 10), async (req, res) => {
//   console.log("files", req.files);
//   console.log("body", req.body);

//   const newProduct = new AdminProducts({
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     long_desc: req.body.long_desc,
//     stock: req.body.stock,
//     short_desc: req.body.short_desc,
//     images: req.files.map(file => file.path)
//   })

//   await newProduct.save();
//   res.json({ message: "Done!" })

// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});


const mongooseUrl =
  "mongodb+srv://capnhatthientong:vBWpsqeYtphlZv5c@cluster0.pfd6by5.mongodb.net/data";

const mongoose = require("mongoose");
mongoose
  .connect(mongooseUrl)
  .then((result) => {
    mongoose.Promise = global.Promise;
    let dB = mongoose.connection;
    dB.on("error", console.error.bind(console, "Connect to mongo failed"));
    //===============================

    io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);
      socket.on("join_room", (data) => {
        console.log('data111', data);
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
      socket.on("chat_message", (data) => {
        console.log('data1', data, data.message, data.time);
        // io.to(data.room).emit("chat_message", data);
        io.emit("chat_message", data);
      });
      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
    });

    server.listen(PORT, function () {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
