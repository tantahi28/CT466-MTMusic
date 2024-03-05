const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const uploadMultiple = upload.fields([
    { name: 'image_path', maxCount: 1 },
    { name: 'audio_path', maxCount: 1 },
]);

module.exports = uploadMultiple;