const express = require("express")
const router = express.Router()
const multer = require("multer")
let Image = require('../models/image');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../public/uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage})

//getImage/
router.get('/', (req, res) => {
    Image.find()
    .then((images) => res.json(images))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//addImage
router.post('/add', upload.single("articleImage"), (req, res) => {
const newItem = new Image({
    userId: req.body.userId,
    articleImage: req.file.originalname
    });
    newItem
    .save()
    .then(() => res.json("New avatar created"))
    .catch((err) => res.status(400).json(`Error: ${err}`))
});

//request by id
router.get("/:id", (req, res) => {
    Image.findById(req.params.id)
    .then((images) => res.json(images))
    .catch((err) => res.status(400).json(`Error: ${err}`))
});

//update request
router.put("/update/:id", upload.single("articleImage"), (req, res) => {
    Image.findById(req.params.id)
    .then((images) => {
        images.userId = req.body.userId;
        images.articleImage = req.file.originalname;

        images.save()
        .then(() =>res.json("Avatar updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
    })
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

//delete request
router.delete("/:id", (req, res) => {
    Image.findByIdAndDelete(req.params.id)
    .then(() => res.json("Avatar DELETED"))
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

module.exports = router;