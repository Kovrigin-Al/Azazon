/* this test do not follow all the best testing practices. 
The reason for that is because the test is supposed to just replace 
testing with Postman, rather than to cover the code with solid tests. */

const request = require("supertest");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { app } = require("../index");

describe("/type", () => {
  const testName = Date.now().toString();

  it("shoul create a type in DB, return 201 and a type instance with name property equel to testName variable.", async () => {
    const response = await request(app)
      .post("/api/type")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.CREATED_201);

    expect(response.body.type).toEqual({
      createdAt: expect.any(String),
      id: expect.any(Number),
      name: testName,
      updatedAt: expect.any(String),
    });
  });

  it("should return 200 and a list of types. The list should contain a type object with name property equal to testName", async () => {
    const response = await request(app)
      .get("/api/type")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.OK_200);

    response.body.types.forEach((type) => {
      expect(type).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    //check that the type added in previous test exists
    expect(response.body.types.some((type) => type.name === testName)).toEqual(
      true
    );
  });

  it("should delete the type object with name property equel to testName and return 204", async () => {
    await request(app)
      .delete("/api/type")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.NO_CONTENT_204);

    //check the type object was deleted
    const response = await request(app).get("/api/type");
    expect(response.body.types.some((type) => type.name === testName)).toEqual(
      false
    );
  });

  it("should return error 400 if no types were found with name equal to nameTest", async () => {
    await request(app)
      .delete("/api/type")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.BAD_REQUEST_400, { message: "Not found" });
  });

  it("should prevent user access post and delete requests and return 403", async () => {
    await request(app)
      .post("/api/type")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.FORBIDDEN_403);

    await request(app)
      .delete("/api/type")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.FORBIDDEN_403);
  });

  it("should prevent unauthorized access to post and delete requests and return 401", async () => {
    await request(app).post("/api/type")
    .expect(HTTP_STATUS.UNAUTHORIZED_401);

    await request(app)
      .delete("/api/type")
      .expect(HTTP_STATUS.UNAUTHORIZED_401);
  });
});
