 const multer = require('multer');
 const path = require('path')

 //multer config
 module.exports = multer({
     storage: multer.diskStorage({}),
     filFilter: (req, file, callback) => {
         let ext = path.extname(file.originalname);
         if(ext !==".jpg" && ext !=='.jpeg' && ext !== '.png'){
            callback(res.status(400).json('file type is not supported'), false);
            return
         }
         callback(null, true)
     }
 })

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     console.log(file);
//     const name = file.originalname.split(' ').join('_');
//     // const extension = MIME_TYPES[file.mimetype];
//     callback(null, Date.now() + name);
//   }
// });

// module.exports = multer({storage: storage}).single('image');