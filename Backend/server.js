// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const selectionsRouter = require('./routes/selections');
// app.use('/api/selections', selectionsRouter);


// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS for specific origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://shipping-drodin-1.onrender.com',
    'https://tranquil-dragon-17b541.netlify.app/'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;

// Connect to MongoDB without deprecated options
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const selectionsRouter = require('./routes/selections');
app.use('/api/selections', selectionsRouter);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});