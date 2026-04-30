const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage(
    {
        destination: (req, file, cd) => {
            cd(null, path.join(__dirname, '../uploads/'));
        },
        filename: (req, file, cd) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cd(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    }
);

const upload = multer({ storage: storage });

module.exports = upload;