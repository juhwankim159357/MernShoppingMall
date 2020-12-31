const express = require('express');
const router = express.Router();
const multer = require('multer')


//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")




router.post('/image', (req,res) => {
    //saving image
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        //console.log(res)
        return res.json({ success: true, filePath:res.req.file.path, fileName: res.req.file.filename})
    })
})




module.exports = router;
