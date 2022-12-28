/* this test do not follow all the best testing practices. 
The reason for that is because the test is supposed to just replace 
testing with Postman, rather than to cover the code with solid tests. */

const request = require("supertest");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { app } = require("../index");
const path = require("path");
// const img = require('../')

describe("/item", () => {
  const testName = Date.now().toString();
  const testPrice = 123;
  const testImg = Date.now().toString();
  const testBrandId = 6;
  const testTypeId = 25;
  const testLimit = 9999999999999;

  let id = "";

  it("should create an item in DB, return 201 and an item instance with name property equel to testName variable.", async () => {
    const response = await request(app)
      .post("/api/item")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      //   .field('complex_object', `{ "name": "${testName}", "price": "${testPrice}", "brandId": "${testBrandId}", "typeId": "${testTypeId}"}`, {contentType: 'application/json'})
      .field("name", `${testName}`)
      .field("price", `${testPrice}`)
      .field("brandId", `${testBrandId}`)
      .field("typeId", `${testTypeId}`)
      //   , "price": "${testPrice}", "brandId": "${testBrandId}", "typeId": "${testTypeId}"})
      .attach("img", path.resolve(__dirname, "../__tests__/favicon.jpeg"));

    expect(response.statusCode).toEqual(HTTP_STATUS.CREATED_201);

    expect(response.body.item).toEqual({
      createdAt: expect.any(String),
      id: expect.any(Number),
      name: testName,
      price: testPrice,
      img: expect.any(String),
      updatedAt: expect.any(String),
      brandId: testBrandId,
      typeId: testTypeId,
    });

    id = response.body.item.id;
  });

  it("should return 200 and a list of items.", async () => {
    const response = await request(app)
      .get(`/api/item?limit=${testLimit}`)
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.OK_200);

    response.body.items.rows.forEach((item) => {
      expect(item).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        img: expect.any(String),
        updatedAt: expect.any(String),
        brandId: expect.any(Number),
        typeId: expect.any(Number),
      });
    });
  });

  it("should return 200 and a list of items filtered by brandId", async () => {
    const response = await request(app)
      .get(`/api/item?brandId=${testBrandId}`)
      .expect(HTTP_STATUS.OK_200);

    response.body.items.rows.forEach((item) => {
      expect(item).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        img: expect.any(String),
        updatedAt: expect.any(String),
        brandId: testBrandId,
        typeId: expect.any(Number),
      });
    });
  });

  it("should return 200 and a list of items filtered by typeId", async () => {
    const response = await request(app)
      .get(`/api/item?typeId=${testTypeId}`)
      .expect(HTTP_STATUS.OK_200);

    response.body.items.rows.forEach((item) => {
      expect(item).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        img: expect.any(String),
        updatedAt: expect.any(String),
        brandId: expect.any(Number),
        typeId: testTypeId,
      });
    });
  });

  it("should return 200 and a list of items filtered by typeId and brandId", async () => {
    const response = await request(app)
      .get(`/api/item?typeId=${testTypeId}&brandId=${testBrandId}`)
      .expect(HTTP_STATUS.OK_200);

    response.body.items.rows.forEach((item) => {
      expect(item).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        img: expect.any(String),
        updatedAt: expect.any(String),
        brandId: testBrandId,
        typeId: testTypeId,
      });
    });
  });

  it("should return 200 and the item with name property equal to testName", async () => {
    const response = await request(app)
      .get(`/api/item/${id}`)
      .expect(HTTP_STATUS.OK_200);
    console.log(id);
    expect(response.body.itemFound).toMatchObject({
      createdAt: expect.any(String),
      id: id,
      name: testName,
      price: testPrice,
      img: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should return error 400 if the item was not found by the wrong id", async () => {
    await request(app)
      .get(`/api/item/0`)
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .expect(HTTP_STATUS.BAD_REQUEST_400, { message: "Not found" });
  });

  it("should delete the item object with name property equel to testName and return 204", async () => {
    await request(app)
      .delete("/api/item")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.NO_CONTENT_204);

    //check the item object was deleted
    const response = await request(app).get("/api/item");
    expect(
      response.body.items.rows.some((item) => item.name === testName)
    ).toEqual(false);
  });

  it("should return error 400 if no items were found with name equal to nameTest", async () => {
    await request(app)
      .delete("/api/item")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_ADMIN}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.BAD_REQUEST_400, { message: "Not found" });
  });

  it("should prevent user access post and delete requests and return 403", async () => {
    await request(app)
      .post("/api/item")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .field("name", `${testName}`)
      .field("price", `${testPrice}`)
      .field("brandId", `${testBrandId}`)
      .field("typeId", `${testTypeId}`)
      .attach("img", path.resolve(__dirname, "../__tests__/favicon.jpeg"))
      .expect(HTTP_STATUS.FORBIDDEN_403);

    await request(app)
      .delete("/api/item")
      .set("Authorization", `Bearer ${process.env.TEST_JWT_USER}`)
      .send({ name: testName })
      .expect(HTTP_STATUS.FORBIDDEN_403);
  });

  it("should prevent unauthorized access to post and delete requests and return 401", async () => {
    await request(app)
      .post("/api/item")
      .field("name", `${testName}`)
      .field("price", `${testPrice}`)
      .field("brandId", `${testBrandId}`)
      .field("typeId", `${testTypeId}`)
      .attach("img", path.resolve(__dirname, "../__tests__/favicon.jpeg"))
      .expect(HTTP_STATUS.UNAUTHORIZED_401);

    await request(app)
      .delete("/api/item")
      .send({ name: testName })
      .expect(HTTP_STATUS.UNAUTHORIZED_401);
  });
});
