
import request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../../utils/server';

let server: Express;

beforeAll(async () => {
    server = await createServer()
});

const buildReadingsMock = () => {
    return { 
        readings: [{
            time: 1642500462000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580158,
                lon: -70.567227
            }
        },
        {
            time: 1642500466000,
            speed: 9,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        },
        {
            time: 1642500470000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580117,
                lon: -70.566633
            }
        },
        {
            time: 1642500472000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580117,
                lon: -70.566633
            }
        },
        {
            time: 1642500476000,
            speed: 4,
            speedLimit: 38,
            location: {
                lat: -33.580117,
                lon: -70.566633
            }
        }]
    }
    
}

const buildReadingsWithOutTimeMock = () => {
    return { 
        readings: [{
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580158,
                lon: -70.567227
            }
        },
        {
            time: 1642500466000,
            speed: 9,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        },
        {
            time: 1642510466000,
            speed: 10,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        },
        {
            time: 1642500470000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580117,
                lon: -70.566633
            }
        },
        {
            time: 1642500472000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580117,
                lon: -70.566633
            }
        }]
    }
    
}

const buildReadingsLessThanFive = () => {
    return { 
        readings: [
        {
            time: 1642500466000,
            speed: 9,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        },
        {
            time: 1642510466000,
            speed: 10,
            speedLimit: 38,
            location: {
                lat: -33.58013,
                lon: -70.566995
            }
        },
        {
            time: 1642500470000,
            speed: 40,
            speedLimit: 38,
            location: {
                lat: -33.580117,
                lon: -70.566633
            }
        }]
    }
    
}

describe('GET /api/trips/v1', () => {

    test('should return 200 & valid response', async() => {
        request(server)
            .get(`/api/trips/v1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 3;
            })
    })

});

describe('POST /api/trips/v1', () => {

    it('should return 200 & valid request', async() => {
        request(server)
            .post(`/api/trips/v1`)
            .expect('Content-Type', /json/)
            .send(buildReadingsMock())
            .expect(200)
    })

    it('should return 422 & invalid request if at least one reading does not have time', async() => {
        request(server)
            .post(`/api/trips/v1`)
            .expect('Content-Type', /json/)
            .send(buildReadingsWithOutTimeMock())
            .expect(422)
            .expect((res) => {
                res.body.data.error.statusCode = 422;
                res.body.data.error.srcMessage = 'Time is required in the readings';
            })
    })

    it('should return 422 & invalid request if Length must be at least 5 readings', async() => {
        request(server)
            .post(`/api/trips/v1`)
            .expect('Content-Type', /json/)
            .send(buildReadingsLessThanFive())
            .expect(422)
            .expect((res) => {
                res.body.data.error.statusCode = 422;
                res.body.data.error.srcMessage = 'Must be at least 5 readings';
            })
    })

});

