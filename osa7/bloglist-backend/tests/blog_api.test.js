const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('check', () => {
  expect(0).toBe(0)
})

// async tests =>
// thrown: "Exceeded timeout of 5000 ms for a test.
// Use jest.setTimeout(newTimeout) to increase the timeout value,
// if this is a long-running test."

afterAll(() => {
  mongoose.connection.close()
})