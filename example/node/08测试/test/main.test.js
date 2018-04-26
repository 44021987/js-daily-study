const supertest = require('supertest')
const should = require('should')
const app = require('../app')
const request = supertest(app)

describe('rest/main.test.js', () => {
  const testFib = function (n, statusCode, expect, done) {
    request.get('/fib')
      .query({n: n})
      .expect(statusCode)
      .end((err, res) => {
        res.text.should.equal(expect);
        done(err)
      })
  }
  it('should return 55 when n is 10', done => {
    request.get('/fib')
      .query({
        n: 10
      })
      .end((err, res) => {
        res.text.should.equal('55')
        done(err)
      })
  })
  it('should return 0 when n === 0', done => {
    testFib(0, 200, '0', done)
  })

  it('should equal 1 when n === 1', done => {
    testFib(1, 200, '1', done)
  })

  it('should equal 55 when n === 10', done => {
    testFib(10, 200, '55', done)
  })

  it('should throw when n > 10', done => {
    testFib(11, 500, 'n should <= 10', done)
  })

  it('should throw when n < 0', done => {
    testFib(-1, 500, 'n should >= 0', done)
  })
  it('should throw when n isnt Number', done => {
    testFib('good', 500, 'n should be a Number', done)
  })
  it('should status 500 when error', done => {
    request.get('/fib')
      .query({n: 100})
      .expect(500)
      .end((err, res) => {
        done(err)
      })
  })
})
