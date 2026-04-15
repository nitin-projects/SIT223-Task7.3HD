// Import Supertest to simulate HTTP requests without starting a live server
const request = require('supertest');
// Import the Express application instance from our main server file
const app = require('./server');

describe('Telemedicine API Automated Tests', () => {
    
    // Test Case 1: Continuous Integration Health Check Validation
    // This test ensures that the Stage 7 Monitoring in Jenkins will successfully receive a 200 OK status.
    it('should return a 200 status code for the server health check', async () => {
        // Simulate a GET request to the /health endpoint
        const res = await request(app).get('/health');
        
        // Assert that the HTTP status code is 200 (Success)
        expect(res.statusCode).toEqual(200);
        // Assert that the response body contains the correct active status message
        expect(res.body).toHaveProperty('status', 'Platform is active');
    });

    // Test Case 2: Patient Video Consent Feature Validation
    // This test verifies that the backend successfully processes and records a patient's agreement to the video call terms.
    it('should record video call patient consent successfully', async () => {
        // Simulate a POST request to the consent endpoint with a mock appointment ID (123)
        const res = await request(app).post('/api/appointments/123/consent');
        
        // Assert that the request was successfully processed
        expect(res.statusCode).toEqual(200);
        // Assert that the database flag for video consent is set to true
        expect(res.body).toHaveProperty('videoConsentGranted', true);
        // Assert that the success message matches the expected output
        expect(res.body).toHaveProperty('message', 'Consent successfully recorded.');
    });

});
