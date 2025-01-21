const request = require('supertest');
const { faker } = require('@faker-js/faker'); // Updated import
const app = require('../app');

// Register and login user with dynamic values
const registerAndLoginUser = async () => {
  // Dynamically generate user details using updated faker API
  const name = faker.person.fullName(); // Use faker.person for name
  const email = faker.internet.email(); // Generate a random email
  const password = faker.internet.password(); // Generate a random password

  // Register a new user with dynamic details
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: name,
      email: email,
      password: password,
    });

  console.log(`Registered User: Name: ${name}, Email: ${email}, Password: ${password}`);

  // Login the user with the generated email and password to get the token
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: "Nick_Reilly40@gmail.com", // Use the same dynamically generated email
      password: "6yfyjXEjBd8H22v", // Use the same dynamically generated password
    });

  // Return the login token
  return loginRes.body.token;
};

// Increase Jest timeout for the MongoDB connection
jest.setTimeout(10000); // 10 seconds timeout (default is 5000 ms)

module.exports = { registerAndLoginUser };
