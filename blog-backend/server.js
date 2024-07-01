require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/angular-starter-blog', {});

// For JSON payloads
app.use(express.json({ limit: '50mb' }));
// For URL-encoded payloads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
