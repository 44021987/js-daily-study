const should = require('should')
const main = require('../main')

describe('test/test.main.js', () => {
  it('should equal 55 when n === 10', () => {
    main.fibonacci(10).should.equal(55)
  })
  it('should equal 0 when n === 0'), () => {
    main.fibonacci(0).should.equal(0)
  }
  it('should equal 1 when n === 1'), () => {
    main.fibonacci(1).should.equal(1)
  }
  it('should thow when n > 10', () => {
    (() => {
      main.fibonacci(11)
    }).should.throw('n should <= 10')
  })
  it('should thow when n < 0', () => {
    (() => {
      main.fibonacci(-2)
    }).should.throw('n should >= 0')
  })
  it('should thow when n isnt Number', () => {
    (() => {
      main.fibonacci('aaa')
    }).should.throw('n should be a Number')
  })
})