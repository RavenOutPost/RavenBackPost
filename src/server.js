const express = require('express');
const cors = require('cors');
const { default: upload } = require('./storage');
const nano = require('nano')('http://127.0.0.1:5984');


const app = express();
const db = nano.db.use('users');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).json({message : 'Welcome to this API, documentation in comming'}))

app.post('/addUser',upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const user = req.body;
    
    console.log(user)
    if (!user) {
        return res.status(200).json({message : 'no data'})
        
    }
    const response = await db.insert(user);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur', error });
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