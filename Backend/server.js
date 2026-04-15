const express = require('express');
const app = express();
const PORT = 5000;

// ==========================================
// 1. TWILIO CONFIGURATION & KEYS
// ==========================================
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Jenkins / Docker ke environment se secure keys nikalna
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

// ==========================================
// 2. API ENDPOINTS (ROUTES)
// ==========================================

// Health Check Endpoint (Jenkins Stage 7 Monitoring ke liye)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Platform is active', uptime: process.uptime() });
});

// Dummy Telemedicine Appointment Endpoint
app.get('/api/appointments', (req, res) => {
    res.status(200).json([{ doctor: 'Dr. Nitin', time: '10:00 AM', status: 'Booked' }]);
});

// Video Call Consent Endpoint
app.post('/api/appointments/:id/consent', (req, res) => {
    const appointmentId = req.params.id;

    res.status(200).json({
        message: "Consent successfully recorded.",
        appointmentId: appointmentId,
        videoConsentGranted: true,
        timestamp: new Date()
    });
});

// Twilio Video Token Endpoint (React Frontend ko connect karne ke liye)
app.get('/api/video/token', (req, res) => {
    try {
        const identity = 'Patient_Nitin'; 
        const roomName = 'Consultation_Room_1';

        // Video grant banayein (Room access)
        const videoGrant = new VideoGrant({ room: roomName });

        // Secure Token banayein
        const token = new AccessToken(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            { identity: identity }
        );
        token.addGrant(videoGrant);

        // Token frontend ko bhej dein
        res.send({ token: token.toJwt() });
    } catch (error) {
        console.error("Twilio Token Error:", error);
        res.status(500).json({ error: "Failed to generate video token" });
    }
});

// ==========================================
// 3. SERVER STARTUP & EXPORT
// ==========================================

if (require.main === module) {
    app.listen(PORT, () => console.log(`Telemedicine API running on port ${PORT}`));
}

module.exports = app; // Testing ke liye export kiya gaya hai
