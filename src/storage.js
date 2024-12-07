const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Répertoire de destination des fichiers
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier
  },
});

const upload = multer({ storage });

export default upload