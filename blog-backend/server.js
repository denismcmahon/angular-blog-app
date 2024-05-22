const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/blog', {});

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
