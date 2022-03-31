const Employee = require("../lib/employee.js")

describe("should return associated value for each parameter", () => {
  test("should return name parameter for object", () => {
    expect(new Employee("Matt", "1", "matt@gmail.com", "Employee").getName()).toMatch("Matt")
  })
  test("should return ID parameter for object", () => {
    expect(new Employee("Matt", "1", "matt@gmail.com", "Employee").getId()).toMatch("1")
  })
  test("should return Email parameter for object", () => {
    expect(new Employee("Matt", "1", "matt@gmail.com", "Employee").getEmail()).toMatch("matt@gmail.com")
  })
  test("should return role parameter for object", () => {
    expect(new Employee("Matt", "1", "matt@gmail.com", "Employee").getRole()).toMatch("Employee")
  })
})
