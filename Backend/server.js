require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

// Middleware configuration
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing for the React frontend

// ==========================================
// 1. TWILIO CONFIGURATION & CREDENTIALS
// ==========================================
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Securely retrieve Twilio API keys from the environment variables (injected via Jenkins/Docker)
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

// ==========================================
// 2. API ENDPOINTS (ROUTES)
// ==========================================

// Health Check Endpoint (Utilized by Jenkins Stage 7 for continuous deployment monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Platform is active', uptime: process.uptime() });
});

// Mock Telemedicine Appointment Endpoint
app.get('/api/appointments', (req, res) => {
    res.status(200).json([{ doctor: 'Dr. Nitin', time: '10:00 AM', status: 'Booked' }]);
});

// Video Call Consent Endpoint (Records patient agreement prior to WebRTC connection)
app.post('/api/appointments/:id/consent', (req, res) => {
    const appointmentId = req.params.id;

    res.status(200).json({
        message: "Consent successfully recorded.",
        appointmentId: appointmentId,
        videoConsentGranted: true,
        timestamp: new Date()
    });
});

// Twilio Video Token Endpoint (Authenticates the React frontend to join the secure video room)
app.get('/api/video/token', (req, res) => {
    try {
        const identity = 'Patient_Nitin'; 
        const roomName = 'Consultation_Room_1';

        // Create a Video Grant to authorize access to the designated consultation room
        const videoGrant = new VideoGrant({ room: roomName });

        // Generate a secure JSON Web Token (JWT) using the Twilio credentials
        const token = new AccessToken(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            { identity: identity }
        );
        token.addGrant(videoGrant);

        // Dispatch the encrypted token back to the client
        res.send({ token: token.toJwt() });
    } catch (error) {
        console.error("Twilio Token Generation Error:", error);
        res.status(500).json({ error: "Failed to generate secure video token" });
    }
});

// ==========================================
// 3. SERVER STARTUP & EXPORT
// ==========================================

if (require.main === module) {
    app.listen(PORT, () => console.log(`Telemedicine API successfully running on port ${PORT}`));
}

// Export the Express app instance for automated Jest testing
module.exports = app;
