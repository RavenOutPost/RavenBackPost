const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req,res) => res.send('Welcome on my API'))


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`running on ${port}`)
})