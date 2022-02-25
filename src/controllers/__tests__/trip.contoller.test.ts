
import request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createServer } from '../../utils/server';

let server: Express;

beforeAll(async () => {
  server = await createServer()
});

describe('GET /api/trips/v1', () => {

    it('should return 200 & valid response', async() => {
        request(server)
            .get(`/api/trips/v1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return (err)
                expect(res.body).toContain( Array )
            })

    })

});

