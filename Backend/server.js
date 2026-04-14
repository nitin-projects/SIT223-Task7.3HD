const express = require('express');
const app = express();
const PORT = 5000;

// Health Check Endpoint (Jenkins Stage 7 Monitoring ke liye)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Platform is active', uptime: process.uptime() });
});

// Dummy Telemedicine Appointment Endpoint
app.get('/api/appointments', (req, res) => {
    res.status(200).json([{ doctor: 'Dr. Nitin', time: '10:00 AM', status: 'Booked' }]);
});

if (require.main === module) {
    app.listen(PORT, () => console.log(`Telemedicine API running on port ${PORT}`));
}

module.exports = app; // Testing ke liye export kiya gaya hai
