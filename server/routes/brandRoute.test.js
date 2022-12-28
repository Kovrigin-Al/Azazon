/* this test do not follow all the best testing practices. 
The reason for that is because the test is supposed to just replace 
testing with Postman, rather than to cover the code with solid tests. */

const request = require("supertest");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { app } = require("../index");

describe("/brand", () => {
  const testName = Date.now().toString();

  it("shoul create a brand in DB, return 201 and a brand instance with name property equel to testName variable.", async () => {
    const response = await request(app)
      .post("/api/brand")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.CREATED_201);

    expect(response.body.brand).toEqual({
      createdAt: expect.any(String),
      id: expect.any(Number),
      name: testName,
      updatedAt: expect.any(String),
    });
  });

  it("should return 200 and a list of brands. The list should contain a brand object with name property equal to testName", async () => {
    const response = await request(app)
      .get("/api/brand")
      .expect(HTTP_STATUS.OK_200);

    response.body.brands.forEach((brand) => {
      expect(brand).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    //check that the brand added in previous test exists
    expect(
      response.body.brands.some((brand) => brand.name === testName)
    ).toEqual(true);
  });

  it("should delete the brand object with name property equel to testName and return 204", async () => {
    await request(app)
      .delete("/api/brand")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.NO_CONTENT_204);

    //check the brand object was deleted
    const response = await request(app).get("/api/brand");
    expect(
      response.body.brands.some((brand) => brand.name === testName)
    ).toEqual(false);
  });

  it("should return error 400 if no brands were found with name equal to nameTest", async () => {
    await request(app)
      .delete("/api/brand")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.BAD_REQUEST_400, { message: "Not found" });
  });

  it("should prevent user access post and delete requests and return 403", async () => {
    await request(app)
      .post("/api/brand")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.FORBIDDEN_403);

    await request(app)
      .delete("/api/brand")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.FORBIDDEN_403);
  });

  it("should prevent unauthorized access to post and delete requests and return 401", async () => {
    await request(app)
      .post("/api/brand")
      .expect(HTTP_STATUS.UNAUTHORIZED_401);

    await request(app)
      .delete("/api/brand")
      .expect(HTTP_STATUS.UNAUTHORIZED_401);
  });
});
