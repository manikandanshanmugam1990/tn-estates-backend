const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cron = require('node-cron');

const Plot = require('./models/Plot');

// Routes Imports
const propertyRoutes = require('./routes/propertyRoutes');
const plotRoutes = require('./routes/plotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const locationRoutes = require('./routes/locationRoutes'); // 🚀 Location route
const favouriteRoutes = require('./routes/favouriteRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api/properties', propertyRoutes);
app.use('/api/plots', plotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/locations', locationRoutes); // 🚀 Location route connect
app.use('/api/favourites', favouriteRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.get('/', (req, res) => {
  res.send('TN Real Estate Backend is Running! 🚀');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err.message));

// Cron job for plot holds
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const result = await Plot.updateMany(
      { status: 'Hold', holdExpiresAt: { $lt: now } },
      { status: 'Available', holdExpiresAt: null }
    );
    if (result.modifiedCount > 0) {
      console.log(`⏰ ${result.modifiedCount} expired plots released back to Available.`);
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});