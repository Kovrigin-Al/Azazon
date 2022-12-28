/* this test do not follow all the best testing practices. 
The reason for that is because the test is supposed to just replace 
testing with Postman, rather than to cover the code with solid tests. */

const request = require("supertest");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { app } = require("../index");

const testEmail = 'testemail'+ Date.now().toString() +'@email.com'
const testPassword = 123456
const incorrectEmail = 'incorect.email.com'
const incorrectPassword = 123
const roleUser = 'USER'
const roleAdmin = 'ADMIN'

describe("/user/registration", () => { 


    it("should create the user return 201 and token", async () => {
        const response = await request(app)
      .post("/api/user/registration")
      .send({ email: testEmail, password: testPassword })
      .expect(HTTP_STATUS.CREATED_201);
      expect(response.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    });

    it("should return 400 and message: User with this email is already registred", async () => {
        const response = await request(app)
      .post("/api/user/registration")
      .send({ email: testEmail, password: testPassword })
      .expect(HTTP_STATUS.BAD_REQUEST_400, {message: "User with this email is already registred"});
    })

    it("should return 400 and Wrong credentials", async () => {
        const response = await request(app)
      .post("/api/user/registration")
      .send({ email: incorrectEmail, password: testPassword })
      .expect(HTTP_STATUS.BAD_REQUEST_400, {message: "Wrong credentials"});
    })

    it("should return 400 and Wrong credentials", async () => {
        const response = await request(app)
      .post("/api/user/registration")
      .send({ email: testEmail, password: incorrectPassword })
      .expect(HTTP_STATUS.BAD_REQUEST_400, {message: "Wrong credentials"});
    })

})

describe("/user/login",()=>{
    it("should return 400 and Wrong credentials", async () => {
        const response = await request(app)
      .post("/api/user/login")
      .send({ email: incorrectEmail, password: testPassword })
      .expect(HTTP_STATUS.BAD_REQUEST_400, {message: "Wrong credentials"});
    })

    it("should return 400 and Wrong credentials", async () => {
        const response = await request(app)
      .post("/api/user/login")
      .send({ email: testEmail, password: incorrectPassword })
      .expect(HTTP_STATUS.BAD_REQUEST_400, {message: "Wrong credentials"});
    })

    it("should return 400 and Wrong credentials", async () => {
        const response = await request(app)
      .post("/api/user/login")
      .send({ email: testEmail, password: testPassword+1 })
      .expect(HTTP_STATUS.BAD_REQUEST_400, {message: "Wrong credentials"});
    })

    it("should return 200 and {token: token}", async () => {
        const response = await request(app)
      .post("/api/user/login")
      .send({ email: testEmail, password: testPassword })
      .expect(HTTP_STATUS.OK_200);
      expect(response.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    })
   
})

describe("/user/auth", () => {
    it("should return 200 and {token: token}", async () => { 
        const response = await request(app)
        .get("/api/user/auth")
        .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
        .expect(HTTP_STATUS.OK_200);
        expect(response.body.token).toMatch(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
     })

     it("should return 401 and Unauthorized", async () => { 
        const response = await request(app)
        .get("/api/user/auth")
        //send expired token:
        .set("Authorization", `Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyNEBtYWlsLnJ1Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NzIxNjU2MjksImV4cCI6MTY3MjE2OTIyOX0.6HyV_dniPVYDa0SrmIeTJPHZl4h3Z0j6ne-6Ih8lsJo`)
        .expect(HTTP_STATUS.UNAUTHORIZED_401, {message: "Unauthorized"});
     })
     
     it("should return 401 and Unauthorized", async () => { 
        const response = await request(app)
        .get("/api/user/auth")
        .expect(HTTP_STATUS.UNAUTHORIZED_401, {message: "Unauthorized"});
     })
})




// it("shoul create a type in DB, return 201 and a type instance with name property equel to testName variable.", async () => {
//     const response = await request(app)
//       .post("/api/type")
//       .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
//       .send({ name: testName })
//       .expect(HTTP_STATUS.CREATED_201);

//     expect(response.body.type).toEqual({
//       createdAt: expect.any(String),
//       id: expect.any(Number),
//       name: testName,
//       updatedAt: expect.any(String),
//     });
//   });