
const express = require('express')
const { PORT } = require('./config/envConfig')
const cookieParser = require("cookie-parser");
const db = require('./config/dbConfig')
const cors = require('cors')
const app = express();
app.use(express.json());




app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const qr = require('qrcode')


app.get('/qr', async (req, res) => {
  try {
    const data = {
      name: 'Omkar',
      profession: 'Mern-Stack developer'
    }
    const newqr = await qr.toDataURL(JSON.stringify(data))
    res.send(`<img src=${newqr}></img>`)
  } catch (error) {
    throw error
  }
})


const apiRoutes = require('./routes/indexRoutes');

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE</h1>`);
});
const prepareAndStartServer = () => {
  app.use('/api', apiRoutes);

  db.connect()
  app.listen(PORT, () => {
    console.log(`server running on port:${PORT}`)
  })
}

prepareAndStartServer()
