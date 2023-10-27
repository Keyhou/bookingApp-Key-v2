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

describe('GET /api/user', () => {
    it('should return the user', async () => {
        const res = await request(app)
        .get('/api/user/user')
        .set(
            'Authorization', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdEBwaWFmLmNvbSIsImlkIjo0LCJpYXQiOjE2OTU5MDg3MzIsImV4cCI6MTY5NTkxMjMzMn0.BRZ4_Szcfzy632BtbETNMd704Gc2I0vM7wzGxj2nluw' 
        )
        .expect('Content-Type', /json/)
        .expect(200)
    })
});