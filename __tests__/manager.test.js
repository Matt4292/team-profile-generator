const Manager = require("../lib/manager")

describe("should return associated value for engineer parameters", () => {
  test("should return role parameter for object", () => {
    expect(new Manager("Matt", "1", "matt@gmail.com", "1","Manager").getRole()).toMatch("Manager")
  })
})