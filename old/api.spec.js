const request = require('supertest');
const app = require('../app')


describe('api server', () => {
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

    //first test!
    test ('it responds to get / with a 200 status', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })

    test ('it responds to get /cats with status 200', (done) => {
        request(api)
            .get('/cats')
            .expect(200, done)
    })

    test('responds to delete /cats with status 204', (done) => {
        request(api)
        .delete('/cats')
        .expect(204, done)
    })

    test.skip ('responds to post /cats with status 201', (done) => {
        const testData = {
            name: 'Felix',
            age: 4
        }

        request(api)
        .post('/cats')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ ...testData, adopted:false}, done)
    })
})
