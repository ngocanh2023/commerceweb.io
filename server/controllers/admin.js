const multer = require('multer');
const AdminProducts = require("../models/adminProduct");

exports.adminLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('req.body', req.body)
    try {
        if (username === "admin" && password === "admin") {
            res.json({ message: "Done" })
        } else {
            res.json({ message: "Can not match!" })
        }
    } catch (e) {
        console.log(e)
    }

}
exports.getAdminProducts = (req, res, next) => {
    AdminProducts.find()
        .then(result => { res.json(result) })
        .catch(e => { console.log(e) })
}

exports.getUpdateProducts = (req, res, next) => {
    const productId = req.query.productId;
    AdminProducts.findById(productId)
        .then(result => { res.json(result) })
        .catch(e => { console.log(e) })
}

exports.deleteById = (req, res, next) => {
    const proId = req.query.id;
    AdminProducts.findByIdAndDelete(proId)
      .then(() => {
        res.send("Done!");
      })
      .catch((e) => console.log(e));
  };
  
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // const dir = './public/images';
//         const dir = '/'; //Duong dan dest sau localhost
//         fs.access(dir, (err) => {
//             if (err) {
//                 fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//             } else {
//                 cb(null, dir);
//             }
//         });
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// //Read jpg, jpeg, jfif
// const fileFilter = (req, file, cb) => {
//     const filetypes = /jpeg|jpg|jfif|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Error: Only JPEG and JPG files are allowed!'));
//     }
// };


// exports.updateProduct = (req, res, next) => {
//     const update = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1000000 } }).array("images", 10);
//     update(async (req, res) => {
//     const { name, category, price, long_desc, stock, short_desc } = req.body;
//     const images = req.files.map(file => file.path);

//     console.log("files", req.files);
//     console.log("body", req.body);
//         try {
//             const updatedProduct = await Product.findByIdAndUpdate(productId, {
//                 name,
//                 category,
//                 price,
//                 long_desc,
//                 stock,
//                 short_desc,
//                 images
//             }, { new: true });

//             res.json(updatedProduct);
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Server Error');
//         }
//     })
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1000000 } }).array("images", 10);

// exports.uploadProduct =  (req, res, next) => {
//     upload(async(req,res) => {
//         const { name, category, price, long_desc, stock, short_desc } = req.body;
//         const images = req.files.map(file => file.path);
        
//             console.log("files", req.files);
//             console.log("body", req.body);

//         const newProduct = new AdminProducts({
//             name: req.body.name,
//             category: req.body.category,
//             price: req.body.price,
//             long_desc: req.body.long_desc,
//             stock: req.body.stock,
//             short_desc: req.body.short_desc,
//             images: req.files.map(file => file.path)
//         })
        
//         await newProduct.save();
//         res.json({ message: "Done!" })
//     })

// }
