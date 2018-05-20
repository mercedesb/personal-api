//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../server');

chai.use(chaiHttp);

describe('loading express', () => {
  it('responds to /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  })

  it('returns 404 for non-route', (done) => {
    chai.request(server)
      .get('/prudence')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      })
  })
})

