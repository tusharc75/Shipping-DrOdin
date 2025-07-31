// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();
// // const port = process.env.PORT || 5000;

// // app.use(cors());
// // app.use(express.json());

// // const uri = process.env.ATLAS_URI;
// // mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // const connection = mongoose.connection;
// // connection.once('open', () => {
// //   console.log("MongoDB database connection established successfully");
// // })

// // const selectionsRouter = require('./routes/selections');
// // app.use('/api/selections', selectionsRouter);


// // app.get('/', (req, res) => {
// //   res.send('Hello from the backend!');
// // });

// // app.listen(port, () => {
// //     console.log(`Server is running on port: ${port}`);
// // });





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Configure CORS for specific origins
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://shipping-drodin-1.onrender.com',
//     'https://tranquil-dragon-17b541.netlify.app'
//   ],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// const uri = process.env.ATLAS_URI;

// // Connect to MongoDB without deprecated options
// mongoose.connect(uri)
//   .then(() => {
//     console.log("MongoDB database connection established successfully");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });

// const selectionsRouter = require('./routes/selections');
// app.use('/api/selections', selectionsRouter);

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('Shutting down gracefully...');
//   await mongoose.connection.close();
//   process.exit(0);
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

// Configure CORS - be more permissive for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://192.168.0.165:3000',
      'https://shipping-drodin-1.onrender.com',
      'https://endearing-pudding-3d7b9d.netlify.app'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For development, allow all localhost origins
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

const uri = process.env.ATLAS_URI;

// Connect to MongoDB
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
  res.json({ message: 'Hello from the backend!', status: 'running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ success: false, error: error.message });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`CORS enabled for development and production origins`);
});