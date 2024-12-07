const express = require('express');
const cors = require('cors');
const upload = require('./storage.js')
const nano = require('nano')('http://127.0.0.1:5984');


const app = express();
const db = nano.db.use('users');

app.use(cors());
app.get('/', (req, res) => res.status(200).json({message : 'Welcome to this API, documentation in comming'}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


app.post('/addUser' ,upload.fields([
  { name: 'file', maxCount: 1 }, 
  { name: 'name', maxCount: 1 }, 
  { name: 'email', maxCount: 1 },
]), (req, res) => {
  try {
    console.log('Champs textuels:', req.body.name, req.body.email);

 
  console.log('Fichier téléchargé:', req.files.file);

  res.status(200).json({
    message: 'Fichier et données textuelles reçus avec succès',
    file: req.files.file,   
    name: req.body.name,   
    email: req.body.email, 
  })
}
catch(e) {
  res.status(500).json({message : 'error', e})
}
});
  //   console.log(req.body)
  //   console.log(req.file)
  //   const file = req.file;
  //   const user = req.body;

  //   console.log(user)
  //   if (!user) {
  //       return res.status(200).json({message : 'no data'})
        
  //   }
  //   const response = await db.insert(user);
  //   res.status(201).json(response);
  // } catch (error) {
  //   res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur', error });
  // }

app.get('/getUser/:id', async (req, res) => {
  try {
    const user = await db.get(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});