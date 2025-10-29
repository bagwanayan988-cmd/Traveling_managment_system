const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - CLEAN VERSION
const MONGODB_URI = 'mongodb+srv://ayan02:ayan7862%3D@cluster0.wl4226o.mongodb.net/travelDB?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB Cloud Atlas'))
.catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
});

// ... rest of your code (schemas and routes) remains the same ...

app.listen(PORT, () => {
    console.log(`🎯 Server running on http://localhost:${PORT}`);
});