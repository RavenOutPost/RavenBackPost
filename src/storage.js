const multer = require('multer');

console.log('init')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../pictures'); // Répertoire de destination des fichiers
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier
  },
});

const upload = multer({ storage });


module.exports = upload