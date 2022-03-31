const Intern = require("../lib/intern")

describe("should return associated value for intern parameters", () => {
  test("should return school parameter for object", () => {
    expect(new Intern("Matt", "1", "matt@gmail.com", "SMU","Intern").getSchool()).toMatch("SMU")
  })
  test("should return role parameter for object", () => {
    expect(new Intern("Matt", "1", "matt@gmail.com", "SMU","Intern").getRole()).toMatch("Intern")
  })
})