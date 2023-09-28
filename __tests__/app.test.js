const request = require ('supertest');
const app = require('../app');

describe('GET /api/reservation', () => {
    it('should return a 401 error', async () => {
        const res = await request(app)
        .get('/api/reservation')
        .expect('Content-Type', /json/)
        .expect(401);
    });
});

describe('POST /auth/signin', () => {
    it('should return a signin', async () => {
        const res = await request(app)
        .post('/auth/signin')
        .expect('Content-Type', /json/)
        .send({
            email: 'key@key.key',
            password: 'iphone15',
        })
        .expect(200);
    });
});