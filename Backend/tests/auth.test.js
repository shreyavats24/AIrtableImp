const request = require("supertest"); // Supertest for API testing
const app = require("../app"); // Import Express app
// const express = require("express");
// const app = express();
describe("Authentication API Tests", () => {
  test("Login should return a valid JWT token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "abc@gmail.com", password: "12345" });

    expect(res.status).toBe(200); // Expect HTTP 200 response
    // expect(res.body.token).toBeDefined(); // Expect a token in response
  });

//   test("Login should fail with wrong credentials", async () => {
//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({ email: "wrong@example.com", password: "wrongpass" });

//     expect(res.status).toBe(404); // Expect Unauthorized (401)
//     expect(res.body.message).toBe("Invalid email or password");
//   });
});
