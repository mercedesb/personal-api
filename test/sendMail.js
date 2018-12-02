//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('sendMail', () => {
  describe('without a TO_EMAIL', () => {
    it('returns a 500', () => {
      const request = {
        from: 'test@email.com',
        subject: 'test',
        text: 'test message'
      }
      const res = {}
      it('it should send an email', (done) => {
        chai.request(server)
          .post('/utilities/send')
          .send(request)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      })
    })
  })

  describe('without required fields', () => {
    it('returns a 400', () => {
      const request = {
        subject: 'test',
        text: 'test message'
      }
      const res = {}
      it('it should send an email', (done) => {
        chai.request(server)
          .post('/utilities/send')
          .send(request)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      })
    })
  })

  describe('with required fields', () => {
    beforeEach(() => {
      process.env.TO_EMAIL = "test@email.com"
    })
    
    const request = {
      from: 'test@email.com',
      subject: 'test',
      text: 'test message'
    }
    const res = {}
    it('it should send an email', (done) => {
      chai.request(server)
          .post('/utilities/send')
          .send(request)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    })
  })
})
