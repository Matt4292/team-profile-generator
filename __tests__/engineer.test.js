const Engineer = require("../lib/engineer")

describe("should return associated value for engineer parameters", () => {
  test("should return github parameter for object", () => {
    expect(new Engineer("Matt", "1", "matt@gmail.com", "matt4292","Engineer").getGithub()).toMatch("matt4292")
  })
  test("should return role parameter for object", () => {
    expect(new Engineer("Matt", "1", "matt@gmail.com", "matt4292","Engineer").getRole()).toMatch("Engineer")
  })
})
