const request = require('supertest');
const app = require('../server')

describe('api server testing', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000');
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping the server');
        api.close(done);
    })

    test ('it responds to get / with a 200 status', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })

    test ('it responds to get /players with status 200', (done) => {
        request(api)
            .get('/players')
            .expect(200, done)
    })

    test('responds to delete /players with status 204', (done) => {
        request(api)
        .delete('/players')
        .expect(204, done)
    })

    test ('it responds to get /players/1 with status 200', (done) => {
        request(api)
            .get('/players/1')
            .expect(200, done)
    })

    test ('responds to post /players with status 201', (done) => {
        const testData = {
            name: 'Kane',
            number: 10
        }

        request(api)
        .post('/players')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ ...testData}, done)
    })
})
