const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const uploadMultiple = upload.fields([
    { name: 'urlImg', maxCount: 1 },
    { name: 'urlSong', maxCount: 1 },
]);

module.exports = uploadMultiple;