require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const itemsRouter = require('./routes/items');
const cors = require('cors');
const path = require('path');

const app = express();

//BodyParser middleware
app.use(cors());
app.use(bodyParser.json());

//DB Config

//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log(err);
  });

//Use Routes
app.use('/api/items', itemsRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
