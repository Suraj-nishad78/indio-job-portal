import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, resumeId++ +'-'+file.originalname)
    const {email} = req.body;
    cb(null, email+'-'+file.originalname)
  }
  
})

const upload = multer({ storage })
export {upload}
