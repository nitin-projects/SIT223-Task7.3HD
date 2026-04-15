const request = require('supertest');
const app = require('./server');

describe('Telemedicine API Tests', () => {
    
    it('should return 200 for health check', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'Platform is active');
    });

    it('should record video call consent successfully', async () => {
        const res = await request(app).post('/api/appointments/123/consent');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('videoConsentGranted', true);
        expect(res.body).toHaveProperty('message', 'Consent successfully recorded.');
    });

}); 
