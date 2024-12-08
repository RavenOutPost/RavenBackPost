
const express = require('express');
const cors = require('cors');
const multer = require('multer')
const nano = require('nano')('http://127.0.0.1:5984');
const fs = require('fs')
const {v4 : uuidv4} = require('uuid')
const path = '../pictures'

if (!fs.existsSync(path)) {
    console.log("path created")
    fs.mkdirSync(path)
}
const app = express();
const db = nano.db.use('users');

app.use(cors());
app.get('/', (req, res) => res.status(200).json({message : 'Welcome to this API, documentation in comming'}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path); 
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4()
    req.body.id = uuid;
    cb(null, uuid);
  }
});

const upload = multer({ storage: storage });


app.post('/addUser' ,upload.single('file'), async (req, res) => {
  try {
    console.log(req.files)
       const user = req.body;
        if (!user) {
            return res.status(200).json({message : 'no data'})
        }
        const response = await db.insert(user);

        return res.status(200).json({user: user})
    }
    catch(e) {
    return res.status(500).json({message : `error ${e}`})
    }
});


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