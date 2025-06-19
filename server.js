const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const uploadRoutes = require('./routes/uploadroutes.js');

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());

// 🔹 Health‑check route so HEAD / (and GET /) return 200
app.get('/', (req, res) => {
  res.send('Backend is live ✅');
});

app.use('/api', uploadRoutes);

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;

// 🔹 Bind to 0.0.0.0 instead of default localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
